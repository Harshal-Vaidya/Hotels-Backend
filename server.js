const express = require('express');
const app = express();
const port = 3000;
const db = require('./db.js');


// Importing body-parser and bodyParser.json() converts it into object and makes it available for request.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person.js');
const MenuItem = require('./models/menu.js');

app.get('/', (req, res) => {
  res.send('Hello World!')
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

app.post('/person', async (req, res) => {
  try{
  const data = req.body;

  const newPer = new Person(data);

  const response = await newPer.save();
  console.log("Data saved");
  res.status(200).json(response);
  
  }
  catch(error){
    console.log(error);
    res.status(500).json(error);
  }
})

app.get('/person', async (req,res)=>{
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


app.get('/patience', (req, res) => {
    res.send('Patience is power.Learn to control. Real control is total freedom');
  })

app.get('/idli', (req, res) => {
    res.send({idle:true, count:100,isChutney:true});
  })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})