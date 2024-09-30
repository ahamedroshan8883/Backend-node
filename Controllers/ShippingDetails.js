const Shipping = require("../Models/ShippingDetailModel");
const customAPIError = require("../Error/customAPIError");
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
const getOrdersByUser = async(req,res,next)=>{
  try{
    const OrderDetails = await Shipping.find({email:req.params.email});
    if(!OrderDetails){
      res.status(404).send("Order Items Not found");
    }
    console.log(email);
    
    res.status(200).json(OrderDetails);
  }catch(error){
    console.log(error);
    
    next(new customAPIError(500,error));
  }
}

module.exports = {postShippingDetail,getOrdersByUser};