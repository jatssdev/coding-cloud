let express = require('express')

let bcrypt = require('bcryptjs')
let app = express()
app.use(express.json())
require('./config/conn')
let User = require('./models/userModel')
let userRouter = require('./routes/userRoutes')
app.use('/user', userRouter)


app.post('/login', async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email })

        if (!user) throw 'invalid email id '


        let isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isValidPassword) throw 'invalid password '


        res.send({
            message: 'login successful',
            user: user
        })


    } catch (e) {
        res.send({
            message: e
        })
    }

})

app.get('/users', async (req, res) => {
    let users = await User.find()
    res.send(users)
})

app.delete('/user/:id', async (req, res) => {
    let id = req.params.id

    let deletedUser = await User.findByIdAndDelete(id)

    res.send('user deleted successfully')


})



app.put('/user/:id', async (req, res) => {
    let id = req.params.id
    let updatedUser = await User.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email })
    res.send('user updated successfully')
})

app.listen(9000, () => {
    console.log('server runnign on 9000')
})