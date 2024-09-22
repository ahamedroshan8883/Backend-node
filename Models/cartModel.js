const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        id: { type: Number, required: true }, // Product ID
        title: { type: String, required: true },// Product name
        image: {type:String,required:true},//Product image url
        price: { type: Number, required: true }, // Product price
        quantity: { type: Number, default:1 }, // Fixed typo from "Quatity"
        selectedSize: { type: String, default:'S'} // Fixed typo from "SelectedSize" and used camelCase
    }],
    totalQuantity: { type: Number, default: 0 }, // Total quantity of products in the cart
    totalPrice: { type: Number,  default: 0 }, // Total price of products in the cart
    user: { type: String, required: true } 
})

module.exports = mongoose.model('cart',cartSchema);