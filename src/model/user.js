const mongoose = require('mongoose'); // importing mongoose

const userSchema = new mongoose.Schema({  // creating schema 
    firstName : {
        type:String
    },
    lastName : {
        type:String
    },
    emailId : {
        type:String
    },
    password : {
        type:String
    },
    age : {
        type:String
    },
    gender : {
        type:String
    },

});

const userModel = mongoose.model("User",userSchema); // creating a model
module.exports = userModel; // exporting 