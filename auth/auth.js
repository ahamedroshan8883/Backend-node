const jwt = require('jsonwebtoken');
const customAPIError = require('../Error/customAPIError');


const authMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader||!authHeader.startsWith(" Bearer")){
        next(new customAPIError('Not Aurthorization',401))
    }else{
        try{
            const token = await authHeader.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JSON_SECRETKEY);
            const {email,username,role} = decoded;
            console.log(decoded);
            req.body = {email,username,role};
            next();
        }catch(error){
            next(new customAPIError(error,401))
        }
    }
}
module.exports = authMiddleware;