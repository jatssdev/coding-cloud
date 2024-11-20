let express = require('express')



let app = express()
app.use(express.json())
let bcrypt = require('bcryptjs')

require('./conn')

let Todo = require('./todoModel')
let User = require('./userModel')

app.get('/', (req, res) => {
    console.log('hello from client')
    res.send('Hello from backend')
})

app.post('/add-todo', async (req, res) => {
    let newTodo = Todo({
        title: req.body.title,
        date: req.body.date,
        complete: req.body.complete
    })

    let result = await newTodo.save()

    res.send('new todo Addeds')
})

app.post('/register', async (req, res) => {
    try {
        let { email, name, password } = req.body
        let existing = await User.findOne({ email })

        if (existing) throw 'user already exists!'

        let hashedPassword = await bcrypt.hash(password, 10)

        let user = new User({
            email,
            name,
            password: hashedPassword
        })
        let result = await user.save()
        if (!result) throw 'Database Error'
        res.send({
            message: 'User created successfully',
            success: true,
        })
    } catch (e) {
        res.send({ success: false, message: e })
    }
})


app.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        // let user = await User.findOne({ email }).select('-name') ---> remove perticular key from data 
        let user = await User.findOne({ email })
        if (!user) throw 'Invalid Email Address!'
        let isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw 'Invalid Password'
        let newUserWithoutPassword = user.toObject()
        delete newUserWithoutPassword.password
        res.send({
            message: 'Login Successfull',
            success: true,
            user: newUserWithoutPassword
        })
    } catch (e) {
        res.send({ success: false, message: e })
    }
})
let verifyUser = (req, res, next) => {

    let { userName } = req.params

    if (userName == 'jatin') {
        next()
    } else {
        res.send({ success: false, message: 'invalid user name' })
    }

}
app.get('/todos/:userName', verifyUser, async (req, res) => {
    let todos = await Todo.find()
    res.send(todos)
})


app.post('/gabrudiboli/:userName', verifyUser, (req, res) => {

    res.send('hello jatin, how are you ?')
})

app.listen(9000, () => {
    console.log('server is running on 9000')
})