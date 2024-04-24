const express = require("express");
const router = express.Router();

const Person = require('../models/person.js');

const {generateToken, jsonAuthMiddleware} = require('../jwt');

router.get('/person',jsonAuthMiddleware,async (req,res)=>{
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


// app.post('/person', (req, res) => {

//   const data = req.body;
//   console.log("Data agaya");
//   const newPer = new Person(data);

//   newPer.save((error,savedPerson)=>{
//     if(error){
//       console.log("error saving the person data",error);
//       res.status(500).json({error:"Internal server error"})
//     }
//     else{
//       console.log("Data saved successfully");
//       res.status(200).json(savedPerson);
//     }
//   })
  

// })

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
  
  
  
  router.get('/person/:workType', async (req,res)=>{
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
router.put('/person/:id', async (req, res)=>{
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
  

module.exports = router;  