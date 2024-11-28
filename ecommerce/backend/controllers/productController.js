
let Product = require('../models/productModel')

let addProduct = async (req, res) => {
    try {
        let { title, category, description, discount, price } = req.body
        let images = []
        let files = req.files

        console.log(files);


        files.map((x) => {
            images.push(x.path)
        })

        let product = new Product({
            title,
            category,
            description,
            discount,
            price,
            images
        })
        let result = await product.save()

        if (!result) {
            throw 'Database Error '
        }

        res.send({ success: true, message: 'product added!' })
    } catch (e) {
        res.status(500).send({ success: false, message: e })
    }

}


let getProducts = async (req, res) => {

    let result = await Product.find()

    res.send({ success: true, message: 'all product getting', products: result })

}


module.exports = { addProduct, getProducts }