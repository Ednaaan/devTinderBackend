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

const validateEditProfileData = (req) =>{
     const alloweedEditFields = ["firstName", 
        "lastName",
        "emailId", 
        "photoUrl", 
        "gender", 
        "age", 
        "about",
        "skills"
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => 
      alloweedEditFields.includes(field)
    
    );

    return isEditAllowed;

}

module.exports={
    validateSignUpData,
    validateEditProfileData,
};
