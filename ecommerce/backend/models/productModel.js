let mongoose = require('mongoose')
let productSchema = mongoose.Schema({
    title: String,
    price: String,
    discount: String,
    description: String,
    images: Array,
    category: String
}, { timestamps: true })

let Product = mongoose.model('products', productSchema)

module.exports = Product