const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const auth = require('../middleware/user_jwt');

//create post
router.post('/',auth,async (req, res, next) => {
    try {
        const post = await Post.create({
            image : req.body.image,
            description : req.body.description,
            user : req.user.id

        });

        if(!post){
            res.status(400).json({
                success : false,
                message : 'Sorry post is not created!'
            });
        }

        res.status(200).json({
            success : true,
            message : 'Hurrey! Post created!',
            post : post

        });
    } catch (err) {
        console.log(err);
    }
});

//fetch data

router.get('/',auth, async (req, res, next) => {
    try {
        const post = await Post.find({user : req.user.id, finished : false});

    if(!post){
        res.status(400).json({
            success : false,
            message : 'Somthing went wrong'
        })
    }

    
    res.status(200).json({
        success : true,
        message : 'Data fetched',
        post : post
    });
    } catch (err) {
        console.log("Server error!");
        next();
    }
})


router.get('/', async (req, res, next) => {
    try {
        const post = await Post.find({user : req.user.id, finished : false});

    if(!post){
        res.status(400).json({
            success : false,
            message : 'Somthing went wrong'
        })
    }

    
    res.status(200).json({
        success : true,
        message : 'Data fetched',
        post : post
    });
    } catch (err) {
        console.log("Server error!");
        next();
    }
})


// Delete post
router.get('/delete',auth, async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete({_id: req.body.Post.id, finished : false});

        if(!post){
            res.status(400).json({
                success : false,
                message : "oops! Data not delete."
            })
        }

        res.status(400).json({
            success : true,
            message : "Hurrey! Data deleted."
        })
    } catch (err) {
        console.log("oops! Somthing went wrong.");
        next();
    }
})

module.exports = router;