let bcrypt = require('bcryptjs')
let User = require('../models/userModel')


let welcome = (req, res) => {
    res.send('Hello World From Backend!')
}

let register = async (req, res) => {
    let existingUSer = await User.findOne({ email: req.body.email })

    if (existingUSer) {
        res.send('user already exists')
    } else {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        let newUser = User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })


        let user = await newUser.save()

        res.send('user registered successfully')

    }




}

module.exports = { welcome, register }