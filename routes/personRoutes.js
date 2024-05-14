const express = require("express");
const router = express.Router();

const Person = require('../models/person.js');

const {generateToken, jwtAuthMiddleware} = require('../jwt');


//Profile Route
router.get('/profile',jwtAuthMiddleware, async (req,res)=>{
  try{

    const userId = req.user.id;
    console.log(userId);
    const user = await Person.findById(userId);
    res.status(200).json(user);
  }
  catch(err){
    
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }

})

// GET method to get the person
router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
      const data = await Person.find();
      console.log('data retrieval successful');
      res.status(200).json(data);
    }
    catch(error){
      console.log("data retrieval failed");
      res.status(500).json(error);
    }
  })


//POST route to add a new person
router.post('/signup', async (req, res) => {
    try{
    const data = req.body;
  
    const newPer = new Person(data);
  
    const response = await newPer.save();

    const payload = {id:response.id , email:response.email};
    const token = generateToken(payload);
    console.log("Data saved");
    res.status(200).json({response: response, token: token});
    
    }
    catch(error){
      console.log(error);
      res.status(500).json(error);
    }
  })
  
  
  
  router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='waiter')
        {
        const data = await Person.find({work:workType});
        console.log("data retrieval successful");
        res.status(200).json(data);
        }
        else{
          console.log("enter valid type of work");
          res.status(404).json({error:"Invalid work type"})
        }
    }
    catch(error)
    {
      console.log("Data retrieval failed");
      res.status(500).json(error);
    }
  })



  // Update API
router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        })

        if(!response){
            return res.status(400).json({ error: 'Person not found'});
        }

        console.log("Data updated");
        res.status(200).json(response);

    }
    catch(err)
    {
        console.log("Data retrieval failed");
        res.status(500).json(err);
    }

  })
  
  //Login Route
  router.post('/login', async (req, res)=>{
    try{
        const {username,password}=req.body;

        const user = await Person.findOne({username: username})

        //If user does not exist or password doesnt match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        //generate token
        const payload = {id: user.id, email: user.email};

        const token = generateToken(payload);

        // return token as response
        res.json({token})

    }
    catch(err){
      console.log(err);
      res.status(500).json({error : "Internal Server Error"});
    }
  })
  
  

  //DELETE route to delete person
  router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})





module.exports = router;  