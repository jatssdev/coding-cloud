let express = require('express')

const { addtocart, getAllCarts } = require('../controllers/cartController')

let router = express.Router()

router.post('/cart', addtocart)
router.get('/carts/:userId', getAllCarts)



module.exports = router