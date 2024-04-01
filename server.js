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

//Import the router files
const personRoutes = require('./routes/personRoutes.js');

//Use the router files
app.use('/',personRoutes);



// app.get('/patience', (req, res) => {
//     res.send('Patience is power.Learn to control. Real control is total freedom');
//   })

// app.get('/idli', (req, res) => {
//     res.send({idle:true, count:100,isChutney:true});
//   })

app.post('/menu', async (req,res) =>{
  try{
    const data = req.body;
    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();
    res.status(200).json(response);
    
  }
  catch(err){
    console.log("failed to save data");
    res.status(500).json(err);
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})