const mongoose=require('mongoose')
const exSchema5 = new mongoose.Schema({
  
    receiver:String,
    sender:String
   
    
  }, { collection: 'Connections' });
  
  const Connection = mongoose.model("connect", exSchema5);
  module.exports = Connection;