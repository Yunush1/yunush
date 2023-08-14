const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');


module.exports = async function(req,res,next){
    const  token = req.header('Authorization');

    if(!token){
        res.status(401).json({
            message : 'No token, authorization denied'
        });

    }

    try{
        await jwt.verify(token, process.env.jwtUserSecret,(err,decoded)=>{
            if(err){
                res.status(400).json({
                    message : 'Token not valid'
                })
            }else{
                req.user = decoded.user;
                next();
            }
        });
    }catch(err){
        console.log('Somthing wrong with middleware '+ err);
        res.status(500).json({
            message : 'Server error'
        });
    }
}
// module.exports = mongoose.middleware('jwt')