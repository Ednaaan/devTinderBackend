const mongoose = require('mongoose'); // importing mongoose
const validator = require('validator');
const Jwt = require ("jsonwebtoken");

const userSchema = new mongoose.Schema({  // creating schema 
    firstName : {
        type:String,
        required: true,
        minLength: 4,
        maxLength: 25,
    },
    lastName : {
        type:String
    },
    emailId : {
        type:String,
        trim:true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email: " + value);
            }

        }


    },
    password : {
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak: " + value);
            }

        }
    },
    age : {
        type:Number,
        min:18,

    },
    gender : {
        type:String,
        validate(value){
            if(!["male","female","Other"].includes(value)){
                throw new Error("Gender is not valid");
            }
        },
    },
    photoUrl: {
        type:String,
        default: "https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"

    },
    about:{
        type: String,
        default: "About Section ",

    },
    skills:{
        type: [String],

    }
   

},
 {
    timestamps: true,
 },
);

userSchema.methods.getJWT = async function() {
    const user  = this;
    const token = await Jwt.sign({_id:user._id}, "Adnan@2409", {
        expiresIn: "7d",
    });
    return token;
};

const userModel = mongoose.model("User",userSchema); // creating a model
module.exports = userModel; // exporting 