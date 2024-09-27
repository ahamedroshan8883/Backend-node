const express = require('express');
const { postShippingDetail, getOrdersByUser } = require('../Controllers/ShippingDetails');
let ShippingRouter = express.Router()


ShippingRouter.post('/shipping',postShippingDetail);

ShippingRouter.get('/OrderedItem/:email',getOrdersByUser);

module.exports = ShippingRouter;