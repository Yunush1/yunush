const mongoose = require('mongoose');


// it is user schema incoluding mongoose
const userSchema = new mongoose.Schema({

    //username is a String type and its requirement is also needed
    username: {
        type : String,
        required : true
    },
    // email is a type of String and also it is unique
    email:{
        type : String,
        required : true,
        unique : true
    },
    // avatar is a type of string 
    avatar:{
        type : String,
        required : true
    }
    ,
    password :{
        type : String,
        required : true
    }
});



module.exports = mongoose.model('Users',userSchema);