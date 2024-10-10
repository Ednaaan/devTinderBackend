const express = require('express');

const router = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../model/user");
const bcrypt = require("bcrypt");



router.post("/signup", async(req,res)=>{
    // Validation of data
    try{
        validateSignUpData(req);
    // Encrypt password

    const {firstName, lastName, emailId,password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    
    




    //creating a new instance of the user model
    const user = new User({
        firstName, 
        lastName, 
        emailId,
        password:passwordHash});
   
    await user.save();
    res.send("User Added Succesfully");
   }
   catch(err){
    res.status(400).send("Error in saving the user details...." + err.message);
   }
});

router.post("/login", async(req,res)=>{
    try {
        const {emailId, password } = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credential");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);


        if (isPasswordValid) {

            // Create a Token

            const token = await user.getJWT();
            console.log(token);

            //Add the token to the cookie and send it back to the user;
            res.cookie("token", token,{
                expires: new Date(Date.now() + 3600000),
            });

            return res.status(200).json({ message: "User logged in successfully!" });
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }


    } catch (err) {
        res.status(400).send("Error:" + err.message);

        
    }

});

router.post("/logout", async(req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful");
})



module.exports = router;