import {json,Router}from 'express'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {verifyToken} from "../middleware/authmiddleware.js"
import mongoose from "mongoose";

const adminroute = Router();
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String,required: true },

});
const User=mongoose.model('User',userSchema)

const schedulesschema=new mongoose.Schema({
    tokenid:{type:Number,unique:true},
    patientname:String,
    doctorname:String,
    appointmentdate:String,
    appointmenttime:String
});
const appointments=mongoose.model('Appointments',schedulesschema)
mongoose.connect("mongodb://localhost:27017/REACTEXAM");
// User registration
adminroute.post("/register", async (req, res) => {
    try {
      // const {} = userDetails
      const userDetails = req.body;
      const username = userDetails.userName;
      const password = userDetails.password;
      const email = userDetails.email;
      const userType = userDetails.userType
      // const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, email, userType });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
  
  // User login
  adminroute.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log(email, password);
      const user = await User.findOne({ email });
      console.log(user, "user");
      if (!user) {
        return res
          .status(401)
          .json({ error: "Authentication failed- User doesn't exists" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Authentication failed- password doesn't match" });
      }
  
      const token = jwt.sign(
        { userId: user._id, userType: user.userType },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );
  
      res.cookie("Authtoken", token);
      res.json({
        status: true,
        message: "login success",
        userType: user.userType
      });
      //  console.log('/login in the bakend res', res)
      return res;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
  // Logout
  adminroute.get("/logout", (req, res) => {
    res.clearCookie("Authtoken");
    res.status(200).send("Logout successful");
    return res;
  });

adminroute.post('/appointment', verifyToken, async(req,res)=>{
    const details=req.body;
    const {tokenid, patientname,doctorname,appointmentdate,appointmenttime}=details;
    const exist= await appointments.findOne({tokenid:tokenid})
    if(exist){
        res.status(409).json({Message:'This token already exist !'})
    }
    else {
        const newtoken= new appointments({
            tokenid:tokenid,
            patientname:patientname,
            doctorname:doctorname,
            appointmentdate:appointmentdate,
            appointmenttime:appointmenttime
        })
        await newtoken.save();
        res.status(200).json({Message:'successfully appointmented'});
    }
})

// adminroute.get('/viewappointment',async(req,res)=>{
//     const viewall=await appointments.find();
//     console.log(viewall);
//     if (!viewall){
//         res.status(201).json({Messag:"no appointments yet !" })
//     }
//     else{
//         res.status(200).json(viewall)
//     }
// })
adminroute.get('/viewappointment', async (req, res) => {
  try {
      const viewall = await appointments.find();
      if (!viewall || viewall.length === 0) {
          return res.status(204).json({ message: "No appointments yet!" });
      }
      res.status(200).json(viewall);
  } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "An error occurred while fetching appointments." });
  }
});
adminroute.get('/doctors',async(req,res)=>{
  
  const viewdoctor=await appointments.find({});
  console.log(viewdoctor);
  if (!viewdoctor){
      res.status(201).json({Messag:"no appointments yet !" })
  }
  else{
      res.status(200).json(viewdoctor)
      console.log(viewdoctor)
  }
})


adminroute.get('/doctor',async(req,res)=>{
    const doctorname=req.query.doctorname;
    const viewdoctor=await appointments.find({doctorname:doctorname});
    console.log(viewdoctor);
    if (!viewdoctor){
        res.status(201).json({Messag:"no appointments yet !" })
    }
    else{
        res.status(200).json(viewdoctor)
    }
})

adminroute.put('/updateappointment',async(req,res)=>{
    const update=req.body;
    const {tokenid, newpatientname,newdoctorname,newappointmentdate,newappointmenttime}=update;
    const exist= await appointments.findOne({tokenid:tokenid})
    if(exist){
        await appointments.updateOne({
            tokenid:tokenid},{
            patientname:newpatientname,
            doctorname:newdoctorname,
            appointmentdate:newappointmentdate,
            appointmenttime:newappointmenttime
        })
        res.status(200).json({Message:'updated successfully '})
    }
    else {
      
        res.status(400).json({Message:'token does not exist !'});
    }
})

adminroute.delete('/delete',async(req,res)=>{
    const tokenid=req.query.tokenid;
    const find= await appointments.findOne({tokenid:tokenid})
    if(find){
        await appointments.deleteOne({tokenid})
        res.status(200).json({Message:'deleted sucessfully '})
    }
})
export { adminroute};