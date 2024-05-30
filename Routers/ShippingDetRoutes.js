const express = require('express');

let ShippingRouter = express.Router()

const ShippingController = require('../Controllers/ShippingDetails');

ShippingRouter.post('/shipping',ShippingController);

module.exports = ShippingRouter;