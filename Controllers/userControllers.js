const customAPIError = require("../Error/customAPIError");
const User = require("../Models/userModels");
const jwt = require('jsonwebtoken');

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

const EditProfileByEmail = async (req, res, next) => {
        try {
            const { email } = req.params;  // Assuming you're extracting 'email' from the request parameters.
            const profile = await User.findOne({ email });  // 'profile' is the retrieved user based on email.
    
            if (!profile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            profile.mobile = req.body.mobile;
            profile.username = req.body.username;
            profile.gender = req.body.gender;
            await profile.save();
            res.status(200).send("profile updated");
        } catch (error) {
            console.error(error);  // Log the error for debugging
           next (new customAPIError(500,error)); // Sending server error response
        }
    };
module.exports = {signup,signin,EditProfileByEmail};