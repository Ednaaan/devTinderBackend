const express = require("express");

const app = express();

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

const {adminAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);


app.get("/admin/getAllData",(req,res)=>{{
    res.send("All Data Send");
}});

app.get("/admin/deleteUser",(req,res)=>{{
    res.send("User Data Deleted");
}});


app.listen(2409, ()=>{
    console.log("Server is running smoothly");

});