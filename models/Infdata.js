const mongoose=require('mongoose')
const exSchema1 = new mongoose.Schema({
  
    name: String,
    followers: String,
    city: String,
    cpp: String,
    bio:String,
    mail:String,
    image:String
   
    
  }, { collection: 'Influencer' });
  
  const UserInfo = mongoose.model("Infuencer", exSchema1);
  module.exports = UserInfo;