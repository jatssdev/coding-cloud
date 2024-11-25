let mongoose = require('mongoose')


let usersSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile: String
}, { timestamps: true })




let User = mongoose.model('users', usersSchema)

module.exports = User