import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { reservation,user,Message } from './userRoutes.js';
import { authenticateus } from "../middleware/check.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { authenticate } from "../middleware/auth.js";


dotenv.config();
const adminroute=Router();
const secretkey=process.env.secretkey;
const adminschema=new mongoose.Schema({firstname:String,
                                      lastname:String,
                                      username:{type:String,unique:true},
                                      password:String,
                                      role:String})
const menuschema=new mongoose.Schema({dishname:String,
                                      description:String,
                                      price:Number
})

const admin=mongoose.model('admindetails',adminschema);   
const menu=mongoose.model('menudetials',menuschema);                                    

mongoose.connect('mongodb://localhost:27017/PROJECT');

// signup
adminroute.post('/signupadmin',async(req,res)=>{
    try{
    const data=req.body; //body le full sadhanavum data annu variable il store cheyithu
    const{firstname,lastname,username,password,role}=data
    const hashpassword=await bcrypt.hash(password,10)
    const existingadmin=await admin.findOne({username:username})
    // Check if the user data already exists in the collection user
        if (existingadmin){
           res.status(201).json({ Message: "The user with these details already exists" });
        }
        else{
           const newadmin= new admin({
            firstname:firstname,
            lastname:lastname,
            username:username,
            password:hashpassword,
            role:role
           });
           await newadmin.save();
           console.log('successfully signedup');
            res.send("successfully signed up");
            res.status(200).json();
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//login
adminroute.post('/loginadmin',async(req,res)=>{
    try{
    const {username,password}=req.body;
    // console.log(username);
    const result= await admin.findOne({username:username})
    console.log(result);
    if(!result){
        res.status(404).json({Message:'user not found'});
        console.log('user not found')
    }
    else
    { 
        const isvalid=await bcrypt.compare(password,result.password)    
        if(isvalid){
         const token= jwt.sign ({username:username,role:result.role},secretkey,{expiresIn:"2h"});
         res.cookie('TOKEN',token,{httpOnly:true});
         res.send('Login successfully');
         console.log('Login successfully')
        }
    }
}
catch(error){
    res.status(500).json(error);
}
});

// view all reservation
adminroute.get('/allreservations',authenticateus, async (req, res) => {
    try {
        const allReservations = await reservation.find(); // Fetch all reservations
        res.status(200).json(allReservations); // Return all reservation data in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
});

//add menu
adminroute.post('/menu',authenticateus,async(req,res)=>{
    const menuD=req.body;
    const{dishname,description,price}=menuD;
    const existingmenu=await menu.findOne({dishname:dishname})
    if(existingmenu)
    {
        res.send("this dish is already added.you can update it")
    }
    else
    {
        const newdish= new menu({
            dishname:dishname,
            description:description,
            price:price,
           });
           await newdish.save();
           console.log('new dish added successfully ');
            res.send(" new dish added successfully ");
            res.status(200).json(); 
    }
})

//update dish
adminroute.put('/menu', async (req, res) => {
    const menuD = req.body;
    const { dishname, description, price } = menuD;

    try {
        const existingMenu = await menu.findOneAndUpdate(
            { dishname: dishname },
            { $set: { description: description, price: price } },
            { new: true } // This returns the updated document
        );

        if (existingMenu) {
            res.status(200).json({ message: "Dish updated successfully", updatedDish: existingMenu });
            console.log("Dish updated successfully");
        } else {
            res.status(404).json({ message: "Dish not found. Please add it first." });
            console.log("Dish not found. Please add it first.");
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating dish", error: error.message });
        console.error("Error updating dish:", error);
    }
});
 
//view all dishes
adminroute.get('/allmenu', async (req, res) => {
    try {
        const fullmenu = await menu.find(); // Fetch all reservations
        if (fullmenu.length === 0) {
            res.status(200).json({ message: 'No dishes yet' });
        }else
       { res.status(200).json(fullmenu);} // Return all reservation data in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
});

// all admins
adminroute.get('/alladmin', async (req, res) => {
    try {
        const fulladmin = await admin.find(); // Fetch all reservations
        res.status(200).json(fulladmin); // Return all reservation data in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
});

// all users
adminroute.get('/alluser', async (req, res) => {
    try {
        const fulluser = await user.find(); // Fetch all reservations
        res.status(200).json(fulluser); // Return all reservation data in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
});

//MESSAGES
adminroute.get('/allmessages', async (req, res) => {
    try {
        const fullmessages = await Message.find(); // Fetch all reservations
        res.status(200).json(fullmessages); // Return all reservation data in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
});

//delete dish
adminroute.delete('/menu', async (req, res) => {
    try {
        const { dishname } = req.query;

        const deletedDish = await menu.findOneAndDelete({ dishname });
        if (!deletedDish) {
            return res.status(404).send("Dish not found.");
        }

        console.log(`Dish '${dishname}' deleted successfully`);
        res.status(200).send(`Dish '${dishname}' deleted successfully`);
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).send("Server error. Please try again later.");
    }
});
//logout
adminroute.post('/logout', (req, res) => {
    res.clearCookie('TOKEN', { httpOnly: true });
    res.status(200).json({ message: 'Logout successful' });
    console.log("logouted")
});


export{adminroute};