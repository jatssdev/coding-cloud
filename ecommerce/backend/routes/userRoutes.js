let express = require('express')
const { userRegister } = require('../controllers/userController')
const { upload } = require('../config/cloudinary')



let router = express.Router()

router.post('/register', upload.single('profile'), userRegister)



module.exports = router