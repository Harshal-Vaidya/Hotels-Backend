// import mongoose 
const mongoose = require('mongoose');

// Define URL to your mongoDb database

const mongoURL = 'mongodb://0.0.0.0:27017/hotels';

// Set up mongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


// Get the default connection 
// Mongoose maintains a default connection object representing the MongoDB connection 
const db = mongoose.connection;

//Define event listeners for database connection 

db.on('connected',()=>{
    console.log("Connected to MongoDB Server!!!");
});

db.on('error',(err)=>{
    console.log(" MongoDB Server connection error!!!", err);
});

db.on('disconnected',()=>{
    console.log("MongoDB Server disconnected!!!");
});

// Export the database connection 
module.exports = db;




