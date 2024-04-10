const express = require('express');
const app = express();
const db = require('./db.js');
require('dotenv').config();

const port = process.env.PORT || 3000;


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
const menuRoutes = require('./routes/menuRoutes.js');

//Use the router files
app.use('/',personRoutes);
app.use('/',menuRoutes);








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})