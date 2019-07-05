const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

mongoose.connect('mongodb://localhost:27017/supeng_test', { useNewUrlParser: true })

const conn = mongoose.connection

conn.on('connected', function () {
    console.log('database is connected')
})

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, require: true},
    header: {type: String},
    post: {type: String},
    info: {type: String},
    salary: {type: String},
    company: {type: String}
})

const UserModel = mongoose.model('user', userSchema)
exports.UserModel = UserModel

const chatSchema = mongoose.Schema({
    from: {type:String, require:true},
    to: {type:String, require:true},
    chat_id: {type:String, require:true},
    content: {type:String, require:true},
    read: {type:Boolean, default: false},
    create_time: {type:Number},
})

const ChatModel = mongoose.model('chat', chatSchema)
exports.ChatModel = ChatModel

