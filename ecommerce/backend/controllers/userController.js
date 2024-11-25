
let User = require('../models/userModel')
let bcrypt = require('bcryptjs')
let userRegister = async (req, res) => {
    try {
        let { email, name, password } = req.body

        let { file } = req
        let existing = await User.findOne({ email })

        if (existing) throw 'user already exists!'

        let hashedPassword = await bcrypt.hash(password, 10)

        let user = new User({
            email,
            name,
            password: hashedPassword,
            profile: file.path
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
}


let userLogin = async (req, res) => {
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
}




module.exports = { userRegister, userLogin }