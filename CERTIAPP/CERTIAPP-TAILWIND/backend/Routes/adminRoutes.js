import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";

const adminroute=Router();
const user=new Map();
const certificate=new Map();
const secretkey="certiapp";

//signup
adminroute.post('/signup',async(req,res)=>{
try{
    //res.send("working");
    const signupdata=req.body;
    const{firstname,lastname,username,password,role}=signupdata;
    const newp=await bcrypt.hash(password,10)

   if(user.has(username)){
    res.send('The user with these details already exists');
    console.log('The user with these details already exists');
   }
   else
   {
    user.set(username,{firstname,lastname,username,password:newp,role})
    console.log(user.get(username));
    
    res.send('succesfully signedup ');
    console.log('succesfully signedup');
    
   }
   }
catch(error){
    res.send("error occured");
     }
});
//login
  adminroute.post('/login',async(req,res)=>{
 try{
    const logindata=req.body;
    const{username,password}=logindata;
    const result=user.get(username);
    // console.log(result);
    if(!result){
        res.send('user not found');
        console.log('user not found');
        
    }
    else
    {
        const addinfo=await bcrypt.compare(password,result.password)    
       
        if(addinfo){
          const token= jwt.sign ({username:username,role:result.role},secretkey,{expiresIn:"2h"});
          //console.log(token);
         res.cookie('certiappauth',token,{httpOnly:true});
         res.send('Logged in successfully');
         console.log('Logged in successfully');
         
        }
    }
 }
 catch(error){
    res.send("error occured");
 }
    });

    //issue certificate
    adminroute.post('/issue',authenticate,(req,res)=>{
    // res.send('working');
    //console.log('working');
    try{
    const role=req.role;
    console.log(role);
    const certificateD=req.body;
    const{coursename,certificateid,candidatename,grade,issuedate}=certificateD;
    certificate.set(certificateid,{coursename,certificateid,candidatename,grade,issuedate});
    if(role!=='admin'){
            res.send('you dont have permissiom !');
        } 
    else
    {
        if(certificate.has(certificateid)){
            console.log('here is certificate');
            console.log(certificate.get(certificateid));
            res.send('certificate issued in console');
            console.log(`this is to certify that ${candidatename} has successfully completed ${coursename} with ${grade} on ${issuedate}`);
        }
        else{
            console.log('certificate id does not exist !');
        }
    }
}
catch(error){
    console.log('error');
}
    });
    //logout

    adminroute.post('/logout',(req,res)=>{
    res.clearCookie('certiappauth');
    res.send('logout successfully');
    console.log('logout successfully');
})
    export{adminroute};