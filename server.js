const express = require('express');
const app = express();
const db = require('./db.js'); // This line is responsible for db connection
require('dotenv').config();
const passport = require('./auth');



const port = process.env.PORT || 3000;

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})


// Middleware
const logRequest = (req, res, next)=>{
  console.log(`[${new Date().toLocaleString()}]  -- Request made to : ${req.originalUrl}`);
  next();

}
app.use(logRequest);


// Importing body-parser and bodyParser.json() converts it into object and makes it available for request.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person.js');
const MenuItem = require('./models/menu.js');





//Import the router files
const personRoutes = require('./routes/personRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');

//Use the router files
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})