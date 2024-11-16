let express = require('express')


let app = express()
app.use(express.json())
require('./conn')
let User = require('./userModel')

app.post('/register', async (req, res) => {
    let existingUSer = await User.findOne({ email: req.body.email })

    if (existingUSer) {
        res.send('user already exists')
    } else {
        let newUser = User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })


        let user = await newUser.save()

        res.send('user registered successfully')

    }




})

app.post('/login', async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email })

        if (!user) throw 'invalid email id '


        if (user.password != req.body.password) throw ' incorrect password'

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