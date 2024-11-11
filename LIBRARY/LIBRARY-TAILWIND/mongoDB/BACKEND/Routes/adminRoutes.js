import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose, { Schema, Types } from 'mongoose'

dotenv.config();
const secertkey=process.env.secertkey;
const adminroute=Router();

const userschema= new mongoose.Schema({
    name:String,
    email:String,
    username:{type:String,unique:true},
    password:String,
    role:String
})
const Bookschema=new mongoose.Schema({
    bookname:String,
    authorname:String,
    description:String,
    price:Number
})
const useradmin=mongoose.model('useradminDedtails',userschema);
const bookdetails=mongoose.model('bookdetails',Bookschema);
mongoose.connect('mongodb://localhost:27017/LIBRARY')

adminroute.post('/signup',async(req,res)=>{
    const {name,email,username,password,role}=req.body;
    const newp=await bcrypt.hash(password,10);
    const existinguser=await useradmin.findOne({username:username});
    if(existinguser){
        res.status(404).json({message:'this user with these details already exists'})
    }
    else
    {
        const newuser=new useradmin({
            name:name,
            email:email,
            username:username,
            password:newp,
            role:role
        })
        await newuser.save();
        res.status(200).json({message:'sucessfully signedup'})
    }
})

adminroute.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const result= await useradmin.findOne({username:username});
        // console.log(result);
        if(!result){
            res.status(404).json({Message:'user not found'});
        }
        else
        {
            const isvalid=await bcrypt.compare(password,result.password)          
            if(isvalid){
             const token= jwt.sign ({username:username,role:result.role},secertkey,{expiresIn:"2h"});
             res.cookie('lms',token,{httpOnly:true});
             res.send('Login successfully');
             console.log('Login successfully')
            }
        }
    }
    catch(error){
        res.status(500).json(error);
    }
    });

adminroute.post('/addbooks',authenticate,async(req,res)=>{
    const{bookname,authorname,description,price}=req.body;
    const role=req.userrole;
    if(role!=='admin'){
        res.status(404).json({Message:'you have no permission !'});
        }
    else
    {
        const existbook=await bookdetails.findOne({bookname:bookname});
        if(existbook){
        res.status(201).json("book has already added")
    }
    else
    {
        const newbook= new bookdetails({
            bookname:bookname,
            authorname:authorname,
            description:description,
            price:price
        })
        await newbook.save();
        console.log('book added successfully');
        res.status(200).json(' book added sucessfully');
    }
    } 
});

//view course using get method by miss
adminroute.get('/viewCourse', async(req,res)=>{
    try{
        console.log(course.size);

        if(course.size!=0){
           
            
        res.send(Array.from(course.entries()))
    }
else{
    res.status(404).json({message:'Not Found'});
}}
    catch{
        res.status(404).json({message:"Internal error"})
    }
})
adminroute.get('/viewbook',async(req,res)=>{
   
    const FIND=await bookdetails.find()
    if(FIND){
        console.log(FIND);
    }
    else
    {
        console.log('there is no book added yet !')
    }
})

// adminroute.get('/viewbook', async(req,res)=>{
    
//     try{
//        console.log(books.size);

//        if(books.size!=0){
          
           
//        res.send(Array.from(books.entries()))
//    }
// else{
//    res.status(404).json({message:'Not Found'});
// }}
//    catch{
//        res.status(404).json({message:"Internal error"})
//    }
// })
adminroute.get('/viewuser',authenticate,(req,res)=>{
    try{
    const user=req.userrole;
    res.json({user});
}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})
export {adminroute};