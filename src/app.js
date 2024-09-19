const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstName:"Adnan", lastName: "Sohail"});

}); 

app.post("/user",(req,res)=>{
    // console.log("Save data to the srver");
    res.send("Data successfully save to the database");

}); 


app.get("/adnan",(req,res)=>{
    res.send("Adnan is working");

});

app.delete("/user",(req,res)=>{
    res.send("Delete Successfully");
});

app.listen(2409, ()=>{
    console.log("Server is running smoothly");

});