const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  OrderItems:{
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
      }  
});

module.exports = mongoose.model("Shipping", shippingSchema);