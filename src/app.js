const express = require("express");
const connectDB = require("./config/database");
const app = express();
// const User = require("./model/user");
// const {validateSignUpData} = require("./utils/validation");

// const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
// const Jwt = require("jsonwebtoken");
// const {userAuth} = require("./middlewares/auth");

// app.get("/user",(req,res)=>{
//     res.send({firstName:"Adnan", lastName: "Sohail"});

// }); 

// app.post("/user",(req,res)=>{
//     // console.log("Save data to the srver");
//     res.send("Data successfully save to the database");

// }); 


// app.get("/adnan",(req,res)=>{
//     res.send("Adnan is working");

// });

// app.delete("/user",(req,res)=>{
//     res.send("Delete Successfully");
// });


// app.use("/user",(req,res,next)=>{
//     console.log("playing with route handler");
//     next();
// },
// (req,res,next)=>{
//     console.log("next response will called ");
//     res.send("Next respose is called");
// }


// )

// const {adminAuth} = require("./middlewares/auth");

// app.use("/admin",adminAuth);


// app.get("/admin/getAllData",(req,res)=>{{
//     res.send("All Data Send");
// }});

// app.get("/admin/deleteUser",(req,res)=>{{
//     res.send("User Data Deleted");
// }});
app.use(express.json());
app.use(cookieParser());

const router = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");



app.use("/", router);
app.use("/", profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);







// sign up
// app.post("/signup", async(req,res)=>{
//     // Validation of data
//     try{
//         validateSignUpData(req);
//     // Encrypt password

//     const {firstName, lastName, emailId,password} = req.body;

//     const passwordHash = await bcrypt.hash(password, 10);
//     // console.log(passwordHash);
    
    




//     //creating a new instance of the user model
//     const user = new User({
//         firstName, 
//         lastName, 
//         emailId,
//         password:passwordHash});
   
//     await user.save();
//     res.send("User Added Succesfully");
//    }
//    catch(err){
//     res.status(400).send("Error in saving the user details...." + err.message);
//    }
// });

// Login Api

// app.post("/login", async(req,res)=>{
//     try {
//         const {emailId, password } = req.body;

//         const user = await User.findOne({emailId: emailId});
//         if(!user){
//             throw new Error("Invalid Credential");
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);


//         if (isPasswordValid) {

//             // Create a Token

//             const token = await user.getJWT();
//             console.log(token);

//             //Add the token to the cookie and send it back to the user;
//             res.cookie("token", token,{
//                 expires: new Date(Date.now() + 3600000),
//             });

//             return res.status(200).json({ message: "User logged in successfully!" });
//         } else {
//             return res.status(401).json({ message: "Incorrect password" });
//         }


//     } catch (err) {
//         res.status(400).send("Error:" + err.message);

        
//     }

// });
// Profile API
// app.get("/profile", userAuth,  async(req,res)=> {
//     try{
//     const user = req.user;
    
//     res.send(user);
//     } catch(err){
//         res.status(400).send("Error: " + err.message);
//     }
// });



// Send Connectiinn request

// app.post("/sendConnectionRequest", userAuth, async(req,res)=>{
//     const user = req.user;
//     res.send(user.firstName + "send a connection request");
// })



// Feed API - Get/Feed - get all the users from the databsae;
// app.get("/user", async(req,res)=>{
//      const userEmail = req.body.emailId;

//     try{
//         const user = await User.findOne({emailId :  userEmail});
//         if(!user){
//             res.status(404).send("User not found");
//         }
//         else{
//             res.send(user);
//         }
//     }
//     catch(err){
//         res.status(401).send("Something went wrong");
//     }

// });

// app.get("/feed", async(req,res)=>{

//    try{
//        const user = await User.find({});
//            res.send(user);
       
//    }
//    catch(err){
//        res.status(401).send("Something went wrong");
//    }

// });

// Delete a user 
// app.delete("/delete", async(req,res)=>{
//     const userId = req.body.userId;
//     try {
//         const user = await User.findByIdAndDelete({_id : userId});
//         res.send("User Deleted successfully");
//     } catch (err) {
//         res.status(401).send("something went wrong");
        
//     }

// });


// app.patch("/user", async(req,res)=>{
//     const userId = req.body.userId;
//     const data = req.body;

//     try {
//         const user = await User.findByIdAndUpdate({_id: userId}, data,{
//             returnDocument: "after",
//             runValidators:true,
//         });
//         console.log(user);
//         res.send("User updated successfully");
//     } catch (err) {
//         res.status(400).send("Update failed"+ err.message);
        
//     }
// });









connectDB()
  .then(()=>{
    console.log("Database connection established");
    app.listen(2409, ()=>{
        console.log("Server is running smoothly");
    
    });

}).catch((err)=>{
    console.error("Database cannot be connected");
});

 