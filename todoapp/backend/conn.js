let mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/codingcloudtodo').then(() => {
    console.log('database connected!')
})