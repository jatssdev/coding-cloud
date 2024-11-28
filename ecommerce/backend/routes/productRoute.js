let express = require('express')

const { upload } = require('../config/cloudinary')
const { addProduct, getProducts } = require('../controllers/productController')

let router = express.Router()

router.post('/product', upload.array('images'), addProduct)
router.get('/products',getProducts)



module.exports = router