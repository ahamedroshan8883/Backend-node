const customAPIError = require("./customAPIError")

const errorhandler = (err,res)=>{
    if(err instanceof customAPIError)
        res.status(500).json({mgs:err.message});
    else res.status(500).json({mgs:err.message})
};
 module.exports = errorhandler;