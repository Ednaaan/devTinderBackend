const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked");
    const token = "abc";
    const isAdminAuthorised = token === "abc";

    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised request");
    }
    else{
        next();
    }
    
};

module.exports={
    adminAuth,
}