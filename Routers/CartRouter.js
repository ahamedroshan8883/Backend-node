const express = require('express');
const { AddCartItem_IncreaseQuan,DecreaseQuantity, RemoveCartItem, getCartByUser, selectedSizeatCart, clearCart } = require('../Controllers/cartController');
const cartRotuer = express.Router();

// http://localhost:8081/ARA/AddCartItem
cartRotuer.post('/AddCartItem',AddCartItem_IncreaseQuan);
// http://localhost:8081/ARA/getCart
cartRotuer.get('/getCart/:user',getCartByUser);
// http://localhost:8081/ARA/DecreaseItem
cartRotuer.post('/DecreaseItem',DecreaseQuantity);
// http://localhost:8081/ARA/RemoveCartItem
cartRotuer.delete('/RemoveCartItem',RemoveCartItem);
// http://localhost:8081/ARA/ClearCart
cartRotuer.delete('/clearCart',clearCart);
module.exports = cartRotuer;