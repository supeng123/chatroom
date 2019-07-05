var express = require('express');
var router = express.Router();
var {UserModel, ChatModel} = require('../db/models');
var md5 = require('blueimp-md5')

const filterPassword = {password: 0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  const {username, password, type} = req.body;
  UserModel.findOne({username}, function(err, user){
    if (err) res.send({code: 1, msg:'usermodel is wrong' });
    if (user) {
      res.send({code: 1, msg:'username is existing' });
    } else {
      new UserModel({username, type, password: md5(password)}).save(function (err, useDoc){
        if (err) {
          res.send({code: 1, msg:'username can not save '});
        }
        const data = {username, type, id: useDoc._id};
        res.cookie('userid', useDoc._id, {maxAge: 1000*60*60*24*7})
        res.send({code: 0, data: data})
      })
    }
  }) 
});

router.post('/login', function(req, res, next) {
  const {username, password} = req.body;
  UserModel.findOne({username, password: md5(password)}, filterPassword, function(err, user){
    if (err) res.send({code: 1, msg:' error occuer for find the user' });
    if (user) {
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
      res.send({code: 0, data: user});
    } else {
      res.send({code: 1, msg:'password and username is not correct' });
    }
  }) 
});

router.post('/update', function(req, res, nexxt){
  const userid = req.cookies.userid
  if(!userid){
    res.send({code:1, msg:'please log in first'})
  } else {
    const user = req.body
    UserModel.findByIdAndUpdate({_id: userid}, user, function(error, oldUser){
      if (error) res.send({code: 1, msg:'error occuer for find the user' });
      if (!oldUser){
        res.clearCookie('userid')
        res.send({code: 1, msg:'please log in first' });
      } else {
        const {_id, username, type} = oldUser;
        const data = Object.assign(user, {_id, username, type})

        res.send({code:0 , data})

      }
    })
  }
})


router.get('/user', function(req,res, next){
  const userid = req.cookies.userid;
  if(!userid){
    res.send({code:1, msg:'please log in first'})
  } else {
    UserModel.findOne({_id: userid}, filterPassword, function(error, user){
      if (error) res.send({code: 1, msg:'error occuer for find the user' });
      res.send({code:0, data:user})
    })
  }
})

router.get('/userlist', function(req, res, next){
  const {type} = req.query;
  console.log(type)
  UserModel.find({type}, filterPassword, function(error, users){
    if (error) res.send({code: 1, msg:'error occuer for find the userlist' });
    res.send({code:0, data:users})
  })
})

router.get('/msglist', function(req, res, next){
  const userid = req.cookies.userid;

  UserModel.find(function(err, userDocs) {
    if (err) res.send({code: 1, msg:'error occuer for find the userDocs' });
    // const users = {};
    // userDocs.forEach(doc => {
    //   users[doc._id] = {username: doc.username, header: doc.header}
    // })

    const users = userDocs.reduce(function (total, current) {
      total[current._id] = {username: current.username, header: current.header}
      return total;
    }, {})

    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filterPassword, function(error, chatMsgs){
      if (error) res.send({code: 1, msg:'error occuer for find the chatMsgs' });

      res.send({code:0, data: {users, chatMsgs}})
    })
  })
})

router.post('/readmsg', function(req, res){
  const from = req.body.from;
  //change userid not to,because I can only change the status of message that I can read
  const to = req.body.userid;

  ChatModel.update({from, to, read:false}, {read: true},{multi: true}, function(err, doc){
    if (err) res.send({code: 1, msg:'error occuer for find the chatdoc' });
    console.log('/readmsg', doc)

    res.send({code:0, data: doc.nModified});
  })
})

module.exports = router;
