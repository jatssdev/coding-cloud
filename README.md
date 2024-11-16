
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
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic GET Route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Project!');
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Connecting to MongoDB

### File: `conn.js`
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/backendProject', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
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
const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create and Export User Model
const User = mongoose.model('User', userSchema);
module.exports = User;
```

---

## Building RESTful APIs

### CRUD Operations for Users

#### File: `index.js` (Updated)

- **Create a New User**
```javascript
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

- **Fetch All Users**
```javascript
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

- **Update a User**
```javascript
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

- **Delete a User**
```javascript
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

## Error Handling

Add centralized error handling for invalid routes:
```javascript
app.use((req, res, next) => {
    res.status(404).send('Route not found.');
});
```

---

## Project Configuration

### File: `package.json`
```json
{
  "name": "backend-project",
  "version": "1.0.0",
  "description": "A simple backend project with Node.js and Express",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^6.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
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

Feel free to expand this project with additional models, authentication, or advanced features as needed.
#   c o d i n g c l o u d 
 
 