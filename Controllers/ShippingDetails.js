const Shipping = require("../Models/ShippingDetailModel");
const User = require("../Models/userModels");
const postShippingDetail = async (req, res) => {
  try {
    console.log(req.body);
    
    const { firstname, lastname, phonenumber, email, address, city, state, zipcode } = req.body;

    if (!firstname ||!lastname ||!phonenumber ||!email ||!address ||!city ||!state ||!zipcode) {
      return res.status(400).json({ message: "Fill in all the details" });
    }
    
    const user = await User.findOne({email:email});
    console.log(user);
    
    if(user.email){
      const shippingDetail = await Shipping.create(req.body);
      res.status(201).json(shippingDetail);
    }else{
      res.status(500).send('No account founded please login');
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while saving the shipping details" });
  }
};

module.exports = postShippingDetail;