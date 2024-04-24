const express = require('express');
const app = express();
const db = require('./db.js'); // This line is responsible for db connection
require('dotenv').config();
const passport = require('./auth');

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

const port = process.env.PORT || 3000;


// Importing body-parser and bodyParser.json() converts it into object and makes it available for request.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person.js');
const MenuItem = require('./models/menu.js');


// Middleware
const logRequest = (req, res, next)=>{
  console.log(`[${new Date().toLocaleString()}]  -- Request made to : ${req.originalUrl}`);
  next();

}
app.use(logRequest);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Import the router files
const personRoutes = require('./routes/personRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');

//Use the router files
app.use('/',personRoutes);
app.use('/menu',logRequest,localAuthMiddleware,menuRoutes);








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})