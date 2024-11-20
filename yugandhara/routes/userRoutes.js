let express = require('express')
const { welcome, register } = require('../controllers/userController')


let router = express.Router()


router.get('/welcome', welcome)
router.post('/register', register)



module.exports = router