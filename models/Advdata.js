const mongoose=require('mongoose')
const exSchema4 = new mongoose.Schema({
  
    brandname: String,
    bio:String,
    minreach:String,
    amountperstory:String,
    Image:Buffer
   
    
  }, { collection: 'Advertisment' });
  
  const AdvInfo = mongoose.model("Adv", exSchema4);
  module.exports = AdvInfo;