
# Backend Project Documentation

## Introduction

This project demonstrates the creation of a backend using Node.js and Express.js, with a MongoDB database connection through Mongoose. It includes RESTful API routes for managing users.

---

## Project Setup

### 1. Initialize the Project
Run the following commands to set up the project:

```bash
npm init -y
npm i express mongoose
npm install -g nodemon
```

---

## Basic Server Setup

### File: `index.js`
```javascript
let express = require('express') // same as ---> import express from 'express'
let cors = require('cors')

let app = express()
app.use(cors())
app.use(express.json())
require('./conn')
let User = require('./userModel')
app.get('/', (req, res) => {
    // res.send('hello from backend')
    // res.send('<h1>hello from backend</h1>')
    let arr = [
        'magan', 'maahi', 'jatin', 'chhagan'
    ]
    res.send(arr)
})


app.get('/users', async (req, res) => {
    let users = await User.find()
    res.send(users)
})

app.post('/register', async (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })


    let createdUSer = await newUser.save()

    if (createdUSer) {
        res.send('user registered')
    } else {

        res.send('Error : user not registered')
    }
})

app.delete('/user/:id', async (req, res) => {
    let id = req.params.id
    let response = await User.findByIdAndDelete(id)
    if (response) {
        res.send('user deleted')
    } else {
        res.send('Error :  database error')
    }
})

app.put('/user/:id', async (req, res) => {
    let id = req.params.id
    let body = req.body


    let response = await User.findByIdAndUpdate(id, { name: body.name, email: body.email })
    if (response) {
        res.send('user updated')
    } else {
        res.send('Error : database error')
    }
})

// let user = {
//     name: 'jatin',
//     email: 'jatin@gmail.com'
// }

// let keys = 'new'

// user = { ...user, [keys]: 'magan' }

// console.log(user)

app.listen(8000, () => {
    console.log('server is running on port 8000')
})
```

---

## Connecting to MongoDB

### File: `conn.js`
```javascript
let mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/codingcloud').then(() => {
    console.log('database connected successfully')
})
```

### Integrate the Database Connection
Update `index.js` to include the database connection:
```javascript
const connectDB = require('./conn');
connectDB();
```

---

## Creating the User Model

### File: `userModel.js`
```javascript
let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})


let User = mongoose.model('users', userSchema)

module.exports = User
```

---

## Project Configuration

### File: `package.json`
```json
{
  "name": "coding-cloud",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "maahi",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.1",
    "mongoose": "^8.8.1"
  }
}
```

---

## Summary

This backend project demonstrates how to:
1. Set up a Node.js and Express application.
2. Connect to a MongoDB database using Mongoose.
3. Create a RESTful API for managing users.
4. Handle errors effectively.

