const mongoose=require('mongoose')
const exSchema7 = new mongoose.Schema({
    
    key: String,
    values: [String],
 
   
    
  }, { collection: 'Followers-list' });
  
  const KeyValue = mongoose.model("followersList", exSchema7);
  module.exports = KeyValue;