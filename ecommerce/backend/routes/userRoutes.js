let express = require('express')
const { userRegister, userLogin } = require('../controllers/userController')
const { upload } = require('../config/cloudinary')



let router = express.Router()

router.post('/register', upload.single('profile'), userRegister)
router.post('/login', userLogin)



module.exports = router