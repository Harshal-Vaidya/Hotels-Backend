const express = require('express');
const router = express.Router()

const MenuItem = require('../models/menu.js')

//GET method to get the Menu Items
router.get('/', async (req,res)=>{
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

//POST Method to add Menu Item
router.post('/', async (req,res)=>{
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


router.get('/:taste', async (req, res) =>{
    try{
        const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy' ){
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid Taste type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//PUT method to update the menu item
router.put('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id; // Extract the id of Menu Item from the URL parameter
        const updatedMenuData = req.body; // Updated data for the Menu Item

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


//DELETE method to delete menu item.
router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id; // Extract the Menu's ID from the URL parameter
        
        // Assuming you have a MenuItem model
        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Menu Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;