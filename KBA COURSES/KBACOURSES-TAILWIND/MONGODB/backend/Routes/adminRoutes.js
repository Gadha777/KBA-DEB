import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";
import dotenv from 'dotenv';
import mongoose from "mongoose"; //import cheyiyanam

dotenv.config();
const adminroute=Router();
//define user schema means design
const userschema=new mongoose.Schema({firstname:String,
                                     lastname:String,
                                     username:{type:String,unique:true},
                                     password:String,
                                     role:String})
//create model 
const user=mongoose.model('userrdetails',userschema);
const coursesschema= new mongoose.Schema({coursename:{type:String,unique:true},
                                          courseid:String,
                                          coursetype:String,
                                          description:String,
                                          price:String})
const courses=mongoose.model('coursedetails',coursesschema);
// mongoose connect cheyiyan
mongoose.connect('mongodb://localhost:27017/KBA');

const secretkey=process.env.secretkey;

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
           // user.set(username,{firstname,lastname,username,password:newp,role})
           // console.log(user.get(username));
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
    console.log(result);
    if(!result){
        res.status(404).json({Message:'user not found'});
        console.log('user not found')
    }
    else
    {
        console.log(result.password);
        
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
// adminroute.post('/addcourse', authenticate, async (req, res) => {
//     const coursedata = req.body;
//     const { coursename, courseid, coursetype, description, price } = coursedata;
//     const role = req.userrole;
//     console.log(role);

//     // Check if user is admin
//     if (role !== 'admin') {
//         return res.status(403).json({ message: 'You have no permission!' });
//     }

//     try {
//         const existingcourse = await courses.findOne({ coursename });
        
//         // If course already exists, send a response and stop further execution
//         if (existingcourse) {
//             return res.status(400).json({ message: "Course already added" });
//         }

//         // Create and save new course
//         const newcourse = new courses({
//             coursename,
//             courseid,
//             coursetype,
//             description,
//             price
//         });

//         await newcourse.save();
//         console.log('Course added successfully');
//         return res.status(201).json({ message: 'Course added successfully' });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Server error', error });
//     }
// });

//add course
adminroute.post('/addcourse',authenticate,async(req,res)=>{
    const coursedata=req.body;
    const{coursename,courseid,coursetype,description,price}=coursedata;
    const role=req.userrole;
    console.log(role);

if(role!=='admin'){
   
   // res.send('you have no permission !');
    res.status(404).json({Message:'you have no permission !'});
}
else{
    const existingcourse=await courses.findOne({coursename:coursename})
   if(existingcourse){
    res.status(400).json({message:"course already added"});

   }
   else
   {
     const newcourse= new courses({
        coursename:coursename,
        courseid:courseid,
        coursetype:coursetype,
        description:description,
        price:price
     })    
    await newcourse.save();
    console.log('course add successfully');
    //res.send('add course sucessfully');
    res.status(201).json({Message:'add course sucessfully'});
   }
   

} 
});

//update course
adminroute.post('/updatecourse',authenticate,async(req,res)=>{
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
        const existingcourse=await courses.findOne({coursename:coursename})
        if(existingcourse){
            // course.set(coursename,{coursename,newcourseid,newcoursetype,newdescription,newprice});
            // console.log(course.get(coursename));
            await courses.updateOne(
                { coursename },
                { 
                    courseid: newcourseid,
                    coursetype: newcoursetype,
                    description: newdescription,
                    price: newprice
                })
            // await newcourse.save();
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
// adminroute.get('/viewCourse', async(req,res)=>{
//     try{
//         console.log(course.size);

//         if(course.size!=0){
           
            
//         res.send(Array.from(course.entries()))
//     }
// else{
//     res.status(404).json({message:'Not Found'});
// }}
//     catch{
//         res.status(404).json({message:"Internal error"})
//     }
// })

//..
adminroute.get('/viewCourse', async (req, res) => {
    try {
        // Assuming you have a Course model for your courses collection
        const Courses = await courses.find(); // Fetch all courses from the database

        if (Courses.length !== 0) {
            res.json(Courses); // Send the list of courses as a response
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal error" });
    }
});
// view course
adminroute.post('/viewcourse',async(req,res)=>{
    const viewcourse=req.body;
    const {coursename}=viewcourse;
    const existingcourse=await courses.find({coursename:coursename})
    if(existingcourse){
        console.log('view course details here ')
        console.log(existingcourse);
        res.send('veiw course details in console');
    }
    else{
        res.send('course does not exist !');
        console.log('course does not exist !');
    }
})
//params ayyitt kodukkan
adminroute.get('/getcourse/:name',authenticate,async(req,res)=>{
    const coursename=req.params.name;
   console.log(req.params.name);
   const existingcourse=await courses.find({coursename})
   if(existingcourse)
    {
        console.log('view course details here ')
        console.log(existingcourse);
        res.send('veiw course details in console');
    }
    else{
        res.send('course does not exist !');
        console.log('course does not exist !');
    }
})
//using query
adminroute.get('/getcourse',async(req,res)=>{
    const coursename=req.query.coursename;
  console.log(req.query.coursename);
//   res.send('working');
const existingcourse=await courses.findOne({coursename:coursename})
if(existingcourse){
        console.log('view course details here ')
        console.log(existingcourse);
        // res.send('veiw course details in console');
        res.send(existingcourse);
     
    }
    else{
        res.send('course does not exist !');
        console.log('course does not exist !');
    }
});

//detele course

adminroute.delete('/deletecourse',authenticate,async(req,res)=>{
    const role=req.userrole;
    console.log(role);
    const coursename=req.query.coursename;
    
    if(role!=='admin'){
      res.send('you dont have permission');
    }
    else{
        await courses.find({coursename})
        if(coursename)
            {
                console.log('course deleted successfully ')
                await courses.deleteOne({ coursename })
                res.send(`Course "${coursename}" has been deleted successfully.`);
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
adminroute.put('/updatecourse',authenticate,async(req,res)=>{
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
        const existingCourse= await courses.findOne({coursename:coursename})
        if (existingCourse)
            {
                await courses.updateOne({coursename},{
                                          courseid: newcourseid,
                                          coursetype: newcoursetype,
                                          description: newdescription,
                                          price: newprice
                      
                                  })
            console.log('course updated sucessfully');
            res.status(200).json(' course updated sucessfully');
            
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