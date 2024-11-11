import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";
import dotenv from 'dotenv';

dotenv.config();
const adminroute=Router();
const user= new Map();
const course=new Map();
const secretkey=process.env.secretkey;

// adminroute.get('/',(req,res)=>{
//     res.send("Hello world");
// });

//signup
adminroute.post('/signup',async(req,res)=>{
    try{
    //console.log("hi");
    // console.log(req.body);full print cheyiyan
    const data=req.body; //full sadhanavum data annu variable il store cheyithu
    //console.log(data.firstname); // data il innu firstname mathram print akki
    //const fname=data.firstname //aa firstname fname annu variable il store akki
    const{firstname,lastname,username,password,role}=data
    //console.log(lastname);
    const newp=await bcrypt.hash(password,10)
    //console.log(newp);

     // Check if the user data already exists in the Map
        if (user.has(username)){
           res.status(201).json({ Message: "The user with these details already exists" });
        }
        else{
            user.set(username,{firstname,lastname,username,password:newp,role})
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
        //console.log(isvalid);
       
        if(isvalid){
          const token= jwt.sign ({username:username,role:result.role},secretkey,{expiresIn:"2h"});
          //console.log(token);
         res.cookie('authtoken',token,{httpOnly:true});
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
    adminroute.post('/addcourse',authenticate,(req,res)=>{
        // res.send('working');
        
        const coursedetails=req.body;
        const{coursename,courseid,coursetype,description,price}=coursedetails;
    //    console.log('hello');
        //console.log(req.username);
    // console.log(req.userrole);
    const role=req.userrole;
    console.log(role);

    if(role!=='admin'){
    
        res.send('you have no permission !');
        // res.status(404).json({Message:'you have no permission !'});
    }
    else{
    if(course.has(coursename)){
        res.send("course already added")
    }
    else
    {
        course.set(coursename,{coursename,courseid,coursetype,description,price})
        console.log(course.get(coursename));
        console.log('course add successfully');
        res.send('add course sucessfully');
    }
        // res.status(200).json({Message:'add course sucessfully'});

    } 
        // }
        // catch(error)  {
        
        //     res.status(500).json(error);
        // }
    });

//update course
adminroute.post('/updatecourse',authenticate,(req,res)=>{
    try 
    {
    const role=req.userrole;
    console.log(role);
    const coursedetails=req.body;
    const{coursename,newcourseid,newcoursetype,newdescription,newprice}=coursedetails;
    if(role!=='admin'){
        res.send('you dont have permission !');
      }
    else{
        if(course.has(coursename))
            {
            course.set(coursename,{coursename,newcourseid,newcoursetype,newdescription,newprice});
            console.log(course.get(coursename));
            console.log('updated course sucessfully');
            res.send('updated course sucessfully');
            
            }
        else{
            res.send('this course does not exist !')
        }
  }
}
catch(error){
    res.send ('something wrong !')
}
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

// view course
adminroute.post('/viewcourse',(req,res)=>{
    const viewcourse=req.body;
    const {coursename}=viewcourse;
    if(course.has(coursename))
    {
        console.log('view course details here ')
        console.log(course.get(coursename));
        res.send('veiw course details in console');
    }
    else{
        res.send('course does not exist !');
        console.log('course does not exist !');
    }
})
//params ayyitt kodukkan
adminroute.get('/getcourse/:name',authenticate,(req,res)=>{
   console.log(req.params.name);
   if(course.has(req.params.name))
    {
        console.log('view course details here ')
        console.log(course.get(req.params.name));
        res.send('veiw course details in console');
    }
    else{
        res.send('course does not exist !');
        console.log('course does not exist !');
    }
})
//using query
adminroute.get('/getcourse',(req,res)=>{
  console.log(req.query.coursename);
//   res.send('working');
  if(course.has(req.query.coursename))
    {
        console.log('view course details here ')
        console.log(course.get(req.query.coursename));
        // res.send('veiw course details in console');
        res.send(course.get(req.query.coursename));
     
    }
    else{
        res.send('course does not exist !');
        console.log('course does not exist !');
    }
});

//detele course

adminroute.delete('/deletecourse',authenticate,(req,res)=>{
    const role=req.userrole;
    console.log(role);
    const result=req.query.coursename;
    console.log(result);
    
    if(role!=='admin'){
      res.send('you dont have permission');
    }
    else{
        if(course.has(result))
            {
                console.log('course deleted successfully ')
                course.delete(result);
                res.send(`Course "${result}" has been deleted successfully.`);
            }
        else{
            res.send('course not found !')
        }
    }
})
//logout
adminroute.post('/logout',(req,res)=>{
    res.clearCookie('authtoken');

    res.send('logout successfully');
    console.log('logout successfully');
})

// using put 
adminroute.put('/updatecourse',authenticate,(req,res)=>{
    try 
    {
    const role=req.userrole;
    console.log(role);
    const coursedetails=req.body;
    const{coursename,newcourseid,newcoursetype,newdescription,newprice}=coursedetails;
    if(role!=='admin'){
        res.send('you dont have permission !');
      }
    else{
        if(course.has(coursename))
            {
            course.set(coursename,{coursename,newcourseid,newcoursetype,newdescription,newprice});
            console.log(course.get(coursename));
            console.log('course updated sucessfully');
            res.send(' course updated sucessfully');
            
            }
        else{
            res.send('this course does not exist !')
        }
  }
}
catch(error){
    res.send ('something wrong !')
}
})
// using patch
adminroute.patch('/updatecourse',authenticate,(req,res)=>{
    try 
    {
    const role=req.userrole;
    console.log(role);
    const coursedetails=req.body;
    const{coursename,newcourseid,newcoursetype,newdescription,newprice}=coursedetails;
    if(role!=='admin'){
        res.send('you dont have permission !');
      }
    else{
        if(course.has(coursename))
            {
            const existingcourse=course.get(coursename);
            course.set(coursename, {
                coursename: coursename,
                courseid: newcourseid || existingcourse.courseid,
                coursetype: newcoursetype || existingcourse.coursetype,
                description: newdescription || existingcourse.description,
                price: newprice || existingcourse.price,
            });
            console.log(course.get(coursename));
            console.log('course updated sucessfully');
            res.send(' course updated sucessfully');
            
            }
        else{
            res.send('this course does not exist !')
        }
  }
}
catch(error){
    res.send ('something wrong !')
}
})

export{adminroute};