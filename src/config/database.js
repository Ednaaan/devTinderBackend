const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://namastenode66:gJyTDPnui2JHUxf8@namasteadnan.uufga.mongodb.net/devTinderBackend");
};


module.exports = 
    connectDB; 