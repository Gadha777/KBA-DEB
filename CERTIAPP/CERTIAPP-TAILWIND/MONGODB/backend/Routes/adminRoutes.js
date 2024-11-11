import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";
import mongoose from "mongoose"; 

import dotenv from 'dotenv';
dotenv.config();
const adminroute=Router();
const userschema=new mongoose.Schema({firstname:String,
                                     lastname:String,
                                     username:{type:String,unique:true},
                                     password:String,
                                     role:String})
const certificateschema=new mongoose.Schema({coursename:String,
                                             certificateid:Number,
                                             candidatename:String,
                                             grade:String,
                                             issuedate:String})
//create model 
const user=mongoose.model('userrdetails',userschema);
const certificate=mongoose.model('certificates',certificateschema);

mongoose.connect('mongodb://localhost:27017/CERTIDAPP');
const secretkey = "certiapp";
//const secretkey=process.env.KEY;

//signup
adminroute.post('/signup',async(req,res)=>{
    try{
    const data=req.body; //body le full sadhanavum data annu variable il store cheyithu
    const{firstname,lastname,username,password,role}=data
    const newp=await bcrypt.hash(password,10)
    const existinguser=await user.findOne({username:username})
    // Check if the user data already exists in the collection user
        if (existinguser){
           res.status(201).json({ Message: "The user with these details already exists" });
        }
        else{
           const newuser= new user({
            firstname:firstname,
            lastname:lastname,
            username:username,
            password:newp,
            role:role
           });
           await newuser.save();
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
    // console.log(username);
    const result= await user.findOne({username:username})
    //console.log(result);
    if(!result){
        res.status(404).json({Message:'user not found'});
        console.log('user not found')
    }
    else
    {
        const isvalid=await bcrypt.compare(password,result.password)    
        //console.log(isvalid);
        if(isvalid){
          const token= jwt.sign ({username:username,role:result.role},secretkey,{expiresIn:"2h"});
          //console.log(token);
         res.cookie('certiappauth',token,{httpOnly:true});
         res.send('Login successfully');
         console.log('Login successfully')
        //  console.log("Secret key:", process.env.JWT_SECRET);
        }
    }
}
catch(error){
    res.status(500).json(error);
}
});
    //issue certificate
    adminroute.post('/issue',authenticate,async(req,res)=>{
    try{
    const role=req.role;
    //console.log(role);
    const certificateD=req.body;
    const{coursename,certificateid,candidatename,grade,issuedate}=certificateD;
    if(role!=='admin'){
        res.send('you dont have permissiom !');
    } 
    if(role=='admin')
    {
        const newcerti= new certificate({coursename:coursename,
                        certificateid:certificateid,
                        candidatename:candidatename,
                        grade:grade,
                        issuedate:issuedate})

                        await newcerti.save();
                        console.log('successfully issued certificate');
                         res.send("successfully issued certificate");
                         res.status(200).json();
                    }
                    
    //.
        else{
            console.log('certificate id does not exist !');
        }
    }

catch(error){
    console.log(error);
}
    });

    //view certificate 
    adminroute.get('/getcertificate',async(req,res)=>{
        //console.log(req.query.certificateid);
        const {certificateid}=req.query;
//   res.send('working');
   const fc = await certificate.findOne({certificateid:certificateid})
  if(fc)
    {
        console.log('view course details here ')
        console.log(fc);
        // res.send('veiw course details in console');
        res.send(fc);
     
    }
    else{
        res.send('candidate does not exist !');
        console.log('candidate does not exist !');
    }
    })
    //logout

    adminroute.post('/logout',(req,res)=>{
    res.clearCookie('certiappauth');
    res.send('logout successfully');
    console.log('logout successfully');
})
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
    export{adminroute};