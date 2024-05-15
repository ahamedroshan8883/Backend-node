const customAPIError = require("../Error/customAPIError");
const User = require("../Models/userModels");
const jwt = require('jsonwebtoken');

const signup = async(req,res,next)=>{
    try{
        req.body.role = "user";
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(200).json({user})
    }catch(error){
        next(new customAPIError (error.message, 500))
        console.log(error);
    }
}

const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    console.log({email,password});
    try{
        const user = await User.findOne({email:email,password:password});
        if(!user) res.status(401).json({mgs:"Invalid email/password"});
        else{
            const {email,username,role,gender,mobile} = user;
            console.log({email,username,role,gender,mobile});
            console.log(user.email);
            const token = jwt.sign({email,username,role,gender,mobile},process.env.JSON_SECRETKEY,{expiresIn:'18000s'});
            res.status(200).json(token);
        }
    }catch(error){
        next(new customAPIError(error.message,500))
    }
}

module.exports = {signup,signin};