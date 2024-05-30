const mongoose=require('mongoose')
const exSchema2 = new mongoose.Schema({
    
    username: {
        type: String,
        required: true, // Email is a required field
        unique: true // Ensure email is unique
    },
    Email: {
        type: String,
        required: true, // Email is a required field
        unique: true // Ensure email is unique
    },
  
  role:String,
    password:String
   
    
  }, { collection: 'Inf-auth' });
  
  const Infauth = mongoose.model("Infuencerauth", exSchema2);
  module.exports = Infauth;