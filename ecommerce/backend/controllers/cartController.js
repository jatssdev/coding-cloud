const Cart = require("../models/cartModel")
const Product = require("../models/productModel")
let mongoose = require('mongoose')

let addtocart = async (req, res) => {
    let { productId, userId, quantity } = req.body
    let newCart = Cart({
        productId: productId,
        userId: userId,
        quantity: quantity
    })
    let result = await newCart.save()

    res.send({ success: true, message: 'product added in cart!' })



}
// let getAllCarts = async (req, res) => {
//     try {
//         let userId = req.params.userId;
//         console.log(userId);

//         // Fetch all cart items for the given user
//         let rawCart = await Cart.find({ userId });

//         // Fetch all products corresponding to the productIds in the cart
//         let p = []

//         let products = await Promise.all(
//             rawCart.map(async (cart) => {
//                 return await Product.findById(cart.productId);
//             })
//         );

//         // Send the fetched products as a response
//         res.status(200).send(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "An error occurred", error });
//     }
// };



const getAllCarts = async (req, res) => {
    let { userId } = req.params;  // Assuming you're using Passport.js for authentication

    console.log("UserId:", userId); // Debug: Ensure userId is coming correctly

    try {
        // Convert userId to ObjectId (if it's a string)


        // Fetch all cart items for the user and populate product details
        const carts = await Cart.find({ userId })
            .populate({
                path: 'productId',  // Populate the productId field with product details
                  select:''
            });

        console.log("Fetched Carts:", carts); // Debug: Check what data is being returned

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: 'No carts found for this user' });
        }

        // Sending the populated carts as the response
        res.status(200).json(carts);
    } catch (err) {
        console.error('Error fetching cart products:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


module.exports = { addtocart, getAllCarts }