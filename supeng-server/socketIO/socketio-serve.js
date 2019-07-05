const {ChatModel} = require('../db/models');

module.exports = function (serve) {
    const io = require('socket.io')(serve);
    console.log('is io existing')

    io.on('connection', function(socket) {
        console.log('one client connect to serve');

        socket.on('sendMsg', function({from, to , content}){
            const chat_id = [from, to].sort().join('_');
            console.log('chat_Id'.chat_id);
            const create_time = Date.now();
            new ChatModel({from, to, content, chat_id, create_time}).save(function(error, chatMsg){
                if(error) res.send({code: 1, msg:'error occuer for saving the chatMsg' });

                io.emit('receiveMsg', chatMsg);
            });
        })
    })
}