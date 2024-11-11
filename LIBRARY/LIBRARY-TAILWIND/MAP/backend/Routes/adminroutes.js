import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";
import dotenv from 'dotenv';

dotenv.config();
const adminroute=Router();
const user= new Map();
const books=new Map();
const secretkey=process.env.secretkey;
adminroute.post('/signup',async(req,res)=>{
    try{
    const data=req.body;
    const{name,email,username,password,role}=data
    const newp=await bcrypt.hash(password,10)
        if (user.has(username)){
           res.status(201).json({ Message: "The user with these details already exists" });
        }
        else{
            user.set(username,{name,email,username,password:newp,role})
            console.log(user.get(username));
           console.log('successfully signedup');
            res.send("successfully signed up");
            res.status(200).json();
        }
          
    }
    catch(error){
        res.status(500).json(error);
    }
});
// login
adminroute.post('/login',async(req,res)=>{
    try{
    const {username,password}=req.body;
    console.log(username);
    const result=user.get(username);
    console.log(result);
    if(!result){
        res.status(404).json({Message:'user not found'});
    }
    else
    {
        const isvalid=await bcrypt.compare(password,result.password)          
        if(isvalid){
         const token= jwt.sign ({username:username,role:result.role},secretkey,{expiresIn:"2h"});
         res.cookie('book',token,{httpOnly:true});
         res.send('Login successfully');
         console.log('Login successfully')
        }
    }
}
catch(error){
    res.status(500).json(error);
}
});

    //add course
    adminroute.post('/addbooks',authenticate,(req,res)=>{
        const booksdetails=req.body;
        const{bookname,authorname,description,price}=booksdetails;
    const role=req.userrole;
    console.log(role);

    if(role!=='admin'){
    
//res.send('you have no permission !');
         res.status(404).json({Message:'you have no permission !'});
    }
    else
    {
    if(books.has(bookname)){
        res.send("book has already added")
    }
    else
    {
        books.set(bookname,{bookname,authorname,description,price})
        console.log(books.get(bookname));
        console.log('book added successfully');
        res.send(' book added sucessfully');
    }
        } 
    });

    //viewuser using get
adminroute.get('/viewuser',authenticate,(req,res)=>{
    try{
    const user=req.userrole;
    res.json({user});
}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

    //view course using get method by miss
adminroute.get('/viewbook', async(req,res)=>{
    
     try{
        console.log(books.size);

        if(books.size!=0){
           
            
        res.send(Array.from(books.entries()))
    }
else{
    res.status(404).json({message:'Not Found'});
}}
    catch{
        res.status(404).json({message:"Internal error"})
    }
})
    //view course using get method by miss
    adminroute.get('/viewcart', async(req,res)=>{
    
        try{
           console.log(carts.size);
   
           if(carts.size!=0){
              
               
           res.send(Array.from(carts.entries()))
       }
   else{
       res.status(404).json({message:'Not Found'});
   }}
       catch{
           res.status(404).json({message:"Internal error"})
       }
   })

//logout
adminroute.post('/logout',(req,res)=>{
    res.clearCookie('book');

    res.send('logout successfully');
    console.log('logout successfully');
})
export{adminroute};