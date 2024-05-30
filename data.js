const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserInfo=require('./models/Infdata')
const Infauth=require('./models/Inf-auth')
const AdvInfo=require('./models/Advdata')
const Connection=require('./models/connect')
const KeyValue=require('./models/followersList')
const cors=require('cors');
const multer=require('multer')
const path=require('path')
app.use(express.json());
app.use(cors())

// mongodb+srv://19211a04c8:NjNgOVRb41Q1BmnA@cluster0.sn2plvb.mongodb.net/
const uri = "mongodb+srv://mahesh_5402:mahesh_5402@cluster1.efcaahe.mongodb.net/"||3000;
mongoose.connect(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});



app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

/////influencer data
app.post('/inf-auth', async (req, res) => {

  const abc = req.body;
  const xx=await Infauth.findOne({"Email":abc.Email})
  const yy=await Infauth.findOne({"username":abc.username})
 
  if (xx) {
    // If the entry already exists, send an appropriate response
    return res.send("Entry already exists");
  }
  else if(yy){
    return res.send("Username already taken");
  }
  else{

  try {
    
    const xyz=new Infauth(abc);

    await xyz.save();
    
   
    res.status(201).send("success");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
});



app.post('/insert-inf-data', async (req, res) => {
  try {
    const abc3 = req.body;
    const xyz3=new UserInfo(abc3);

    await xyz3.save();
    res.status(201).send("Given data inserted successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/get-inf-data',async (req,res)=>{
  try{
    const y=req.body;
    const query = { mail: { $ne: y.mail } };
    
    const result = await UserInfo.find(query)
   res.send(result)
    // const x=await UserInfo.find();
    // res.send(x)
  }
  catch(error){
    res.status(500).send(error.message);
  }
})

//////
app.get('/profile/:data',async (req,res)=>{
  try{
    const y=req.params.data
    const query = {name:y};
    
    const result = await UserInfo.find(query)
   res.send(result)
    
  }
  catch(error){
    res.status(500).send(error.message);
  }
 
})


/////
app.get('/get-info-data',async (req,res)=>{
  try{
   
    const x=await UserInfo.find();
    res.send(x)
  }
  catch(error){
    res.status(500).send(error.message);
  }
})

///Branddata

app.get('/get-all-auth',async (req,res)=>{
  try{
  const qwe= await Infauth.find();
  res.send(qwe)}
  catch(error){
    res.status(500).send(error.message);
  }
})

app.post('/insert-adv-data', async (req, res) => {
  try {
    const abc4 = req.body;
    const xyz4=new AdvInfo(abc4);

    await xyz4.save();
    res.status(201).send("Given data inserted successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/get-adv-data',async (req,res)=>{
  try{
    const xx=await AdvInfo.find();
    res.send(xx)
  }
  catch(error){
    res.status(500).send(error.message);
  }
})

///
app.post('/requests',async (req,res)=>{
  const xx=req.body;
  const yy=new Connection(xx)
  await yy.save();
  res.send("success")
})

app.post('/getrequests',async (req,res)=>{
  try{
    const gota=req.body;
    const query = { receiver: gota.receiver };
    
    const result = await Connection.find(query)
   res.send(result)
   
  }
  catch(error){
    res.status(500).send(error.message);
  }

})
///
app.get('/getrequests1',async (req,res)=>{
  try{
    
    
    
    const result = await Connection.find()
   res.send(result)
   
  }
  catch(error){
    res.status(500).send(error.message);
  }

})
///

app.post('/delete-request',async(req,res)=>{
 const xvv=req.body
  const query = { receiver:xvv.receiver,sender:xvv.sender };

  const result = await Connection.deleteOne(query);

  if (result.deletedCount === 1) {
    res.status(200).send('Document deleted successfully');
  } else {
    res.status(404).send('Document not found');
  }

})

app.post('/edit-save', async (req, res) => {
 
    const infoo = req.body;

    // Find the user with the given mail
    const user = await UserInfo.findOne({ mail:infoo.mail });
    
    const query = { receiver: infoo.mail };
    
   
    if (user) {
      // Update the user's name and city
      user.name = infoo.name;
      user.city = infoo.city;

      // Save the updated user
      await user.save();
      }

      
    
      const result = await Connection.find(query)
     res.send(result)

});
app.get('/successful-connections',async(req,res)=>{
  const qt =  await KeyValue.find()
  res.send(qt)

})

///
app.post('/addKeyValues', async (req, res) => {
  const { key, value } = req.body;
  
  try {
   

    // Check if the key exists in the database
    const existingKey = await KeyValue.findOne({ key });
    const existingValue = await KeyValue.findOne({ value });

    if (existingKey) {
      // If key exists, append the value
      existingKey.values.push(value);
      await existingKey.save();
      res.status(200).json({ message: 'Value added to existing key successfully' });
    } else {
      // If key does not exist, create a new document
      const newKey = new KeyValue({
        key,
        values: [value],
      });
      await newKey.save();
      res.status(201).json({ message: 'New key and value added successfully' });
    }

     } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/addKeyValues1', async (req, res) => {
  const { key, value } = req.body;
  
  try {
   

    // Check if the key exists in the database
    const existingKey = await KeyValue.findOne({ key });
   

    if (existingKey) {
      // If key exists, append the value
      existingKey.values.push(value);
      await existingKey.save();
      res.status(200).json({ message: 'Value added to existing key successfully' });
    } else {
      // If key does not exist, create a new document
      const newKey = new KeyValue({
        key,
        values: [value],
      });
      await newKey.save();
      res.status(201).json({ message: 'New key and value added successfully' });
    }

     } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.get('/get-followers-list',async(req,res)=>{
  const x=await KeyValue.find()
   res.send(x)


})


app.get('/images/:email', async (req, res) => {
  try {
    const email = req.params.email;

    // Find the user with the specified email in the UserInfo collection
    const user = await UserInfo.findOne({ mail: email }).then(data=>{res.send(data.image)});

    // If user is not found or user's image field is empty, send a 404 response
    // Corrected 'Image' to 'image' (case sensitive)
  } catch (error) {
    // Handle errors
    console.error('Error fetching image:', error);
    res.status(500).send('Internal Server Error');  
  }
});







app.post('/delete-image',async(req,res)=>{
  const mail=req.body.mail
 
  try {
    const user = await UserInfo.findOne({ mail });

    if (user) {
       
        user.image = undefined;
        await user.save();
        res.status(200).json({ message: 'Image deleted successfully.' });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
} catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Internal server error.' });
}
})








app.post('/upload-image', async (req, res) => {
  const { base64, mail } = req.body; // Destructure base64 and mail from req.body

  try {
      // Find the user with the provided email
      const user = await UserInfo.findOne({ mail: mail });

      if (!user) {
          return res.status(404).json({ message: "User not found with the provided email" });
      }

      // Update the image field of the user
      user.image = base64;
      const updatedUser = await user.save();

      res.status(200).json({ message: "Image uploaded successfully", userInfo: updatedUser });
  } catch (error) {
      res.status(500).json({ message: "Error uploading image", error: error.message });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});


 



