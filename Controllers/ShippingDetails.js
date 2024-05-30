const Shipping = require("../Models/ShippingDetailModel");

const postShippingDetail = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, email, address, city, state, zipcode } = req.body;

    if (
      !firstname ||
      !lastname ||
      !phonenumber ||
      !email ||
      !address ||
      !city ||
      !state ||
      !zipcode
    ) {
      return res.status(400).json({ message: "Fill in all the details" });
    }

    const shippingDetail = await Shipping.create(req.body);
    res.status(201).json(shippingDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while saving the shipping details" });
  }
};

module.exports = postShippingDetail;