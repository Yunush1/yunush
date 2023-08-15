const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image:{
        type : Array
    },
    createdAt:{
        type:Date,
        default : Date.now
    },
    description:{
        type : String
        
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    finished:{
        type : Boolean,
        default : false
    }
});
module.exports =Post= mongoose.model('Post',postSchema);