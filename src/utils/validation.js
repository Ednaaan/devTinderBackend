const validator = require('validator');

const validateSignUpData = (req)=>{
    const{firstName, lastname,emailId,password} = req.body;

    if(!firstName || lastname){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Errior("Invalid Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not Strong");

    }
};

module.exports={
    validateSignUpData,
};
