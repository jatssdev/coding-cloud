let mongoose = require('mongoose')
let cartSchema = mongoose.Schema({
    userId: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },

    quantity: {
        type: Number,
        default: 1
    },

}, { timestamps: true })

let Cart = mongoose.model('carts', cartSchema)

module.exports = Cart