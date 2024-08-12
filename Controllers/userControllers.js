const customAPIError = require("../Error/customAPIError");
const User = require("../Models/userModels");
const jwt = require('jsonwebtoken');
const fs = require("fs");

const signup = async(req,res,next)=>{
    try{
        req.body.role = "user";
        console.log(req.body);
        const {username,email,password,mobile,gender,role}=req.body;
        const existingEmail = await User.findOne({email:email});
        console.log(existingEmail);
        if(existingEmail==null){
            if(username !=='' && email !== '' && password !== '' && mobile !== '' && gender !== '' && role !=='' ){
                const user = await User.create({username,email,password,mobile,gender,role});
                res.status(200).json({user})
            }else{
                next(new customAPIError ('Certain details are missings', 500))
            }
        }else{
            res.status(400).send('Already email is excisted');
        }
    }catch(error){
        next(new customAPIError (error.message, 500))
        console.log(error);
    }
}

const changeAvatar = async(req,res,next)=>{
    try{
        const user = req.user;
        if(!req.files||!req.files.avatar){
            return next(new customAPIError('Please choose a file',422));
        }
        const userData = await User.findOne({email:user.email});
        if(!user){
            next(new customAPIError('User not found'),404);
        }
        if(userData.avatar){
            const oldAvatarPath = path.join(__dirname,"..","uploads",userData.avatar);
            fs.unlink(oldAvatarPath,(err)=>{
                if(err){
                    console.error("Failed to delete the old");
                    return next(new customAPIError("Failed to delete the old",500));
                }
            });
        }
        
    }catch(error){
        next(new customAPIError(error.message, 500));
    }
}
const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    console.log({email,password});
    const user = await User.findOne({email,password});
    try{
        if(!user){
            res.status(500).send('Invalid email/password');
        }else{
            const {email,role,gender,mobile,username} = user;
            const token = jwt.sign({email,role,gender,mobile,username},process.env.JSON_SECRETKEY,{expiresIn:'18000s'});
            res.status(200).send(token);
        }   
    }catch(error){
        next(new customAPIError(error,500));
    }
}

module.exports = {signup,signin};