const express = require('express');
const router = express.Router()

const MenuItem = require('../models/menu.js')

router.get('/menu', async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log("Data retrieval successful");
        res.status(200).json(data);
    }
    catch(error)
    {
        console.log("Data retrieval failed");
        res.status(500).json(error)

    }
})


router.post('/menu', async (req,res)=>{
    try{
        const data = req.body

        const newItem = new MenuItem(data);
        const response = await newItem.save();
        console.log("Data saved");
        res.status(200).json(response);
    }
    catch(error){
        console.log("Data retrieval failed");
        res.status(500).json(error)
    }
})

module.exports = router;