const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs'); // bcryptjs is a dependencies which is used to create a encrypted password
const User = require('../models/User'); 
const user_jwt = require('../middleware/user_jwt'); // user_jwt is a
const jwt = require('jsonwebtoken');
const { token } = require('morgan');


router.get('/', user_jwt, async (req,res,next) =>{
    try {
        const user  = await User.findById(req.user.id).select('-password');
        res.status(200).json({
            success : true,
            user : user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Server error'
        })
        next();
    }
})

router.post('/register',async (req,res,next) =>{
   const {username, email, password} = req.body;

   try {
        let user_exist = await User.findOne({email : email});
        if(user_exist){
            return res.json({
                success : false,
                message : "User already exists"
            });
        }
        let user = new User();
        user.username = username;
        user.email = email;
        
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
       


        let size = 200;
        user.avatar = "https://gravatar.com/avatar/?s="+size+"&d=retro";
       
        await user.save();

        const paylode = {
            user : {
                id : user.id
            }
        }
      
        jwt.sign(paylode, process.env.jwtUserSecret,{
            expiresIn: 360000
        },(err , token)=>{
            if(err) throw err;
            return res.status(200).json({
            success : true,
            token : token
            })
       })

       

   } catch (error) {
        console.log(error)
   }
})

router.post('/login', async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.findOne({
            email : email
        });

        if(!user){
            res.json({
                success : true,
                message : 'User not exist go & register to continue'
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : 'Invalid password'
            })
        }


        const paylode = {
            user :{
                id : user.id
            }
        }

        jwt.sign(paylode, process.env.jwtUserSecret,{
            expiresIn : 360000
        },(err, token)=>{
            if(err) throw err;
            res.status(200).json({
                success : true,
                message : 'User Loged In',
                token : token,
                user : user
            })
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success : false,
            message : 'Server error'
        })
    }
})

module.exports = router;