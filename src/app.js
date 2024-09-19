const express = require("express");

const app = express();

app.use((req,res)=>{
    res.send("Hi Adnan");

});

app.use("/adnan",(req,res)=>{
    res.send("Adnan is working");

});

app.listen(2409, ()=>{
    console.log("Server is running smoothly");

});