const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

mongoose.connect('mongodb://localhost:27017/supeng_test')

const conn = mongoose.connection

conn.on('connected', function () {
    console.log('database is connected')
})


const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, require: true},
    header: {type: String}
})

const UserModel = mongoose.model('user', userSchema)

function testSave() {
    // create user model
    const userModel = new UserModel({
        username: 'Supeng',
        password: md5('123'),
        type: 'dashen'
    })

    userModel.save(function(err, userDoc){
        if (err) {
            console.log('save():' + err)
        }
        console.log('save()' + userDoc)
    })
}

// testSave()

function testFind() {
    UserModel.find((function(err, users){
        if (err) {
            console.log('find():' + err)
        }
        console.log('findall():'+ users)
        UserModel.findOne({name: 'Supeng'}, function (error, user) {
            if (error) {
                console.log('find():' + error)
            }
            console.log('findOne:', user)
        })
    }))
}

// testUpdate()


function testUpdate() {
    UserModel.findByIdAndUpdate({_id: '5ce4d3d7da30ff05ac365baa'}, {username: 'Sugang', type: 'people'}, function(err, doc){
        if (err) {
            console.log('testUpdate():' + err)
        }
        console.log('update user:'+ doc)
    })
}


function testDelete() {
    UserModel.remove({_id: '5ce4d3186aa5c605894719fa'}, function(err, doc){
        if (err) {
            console.log('testDelete():' + err)
        }
        console.log('remove user:'+ doc)
    })
}

testDelete()
testFind()