const mongoose = require("mongoose");

//Define the Menu Schema 

const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet', 'sour', 'spicy'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]

    },
    num_sales:{
        type:Number,
        default: 0,
    }

});


// Create model and export it

const MenuItem = mongoose.model('MenuItem',menuSchema)
module.exports = MenuItem;
