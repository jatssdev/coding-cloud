
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





module.exports = { userRegister }