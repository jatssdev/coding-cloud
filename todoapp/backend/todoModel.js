let mongoose = require('mongoose')


let todoSchema = mongoose.Schema({
    title: String,
    completed: Boolean,
    date: String
}, { timestamps: true })

let Todo = mongoose.model('todos', todoSchema)

module.exports = Todo