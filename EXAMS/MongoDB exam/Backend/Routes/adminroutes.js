import { Router } from "express";
import mongoose from "mongoose";

const schedulesschema=new mongoose.Schema({
    tokenid:{type:Number,unique:true},
    patientname:String,
    doctorname:String,
    appointmentdate:String,
    appointmenttime:String
});
const appointments=mongoose.model('Appointments',schedulesschema)
 mongoose.connect('mongodb://localhost:27017/APPOINTMENT')
const adminroute =Router();

adminroute.post('/appointment',async(req,res)=>{
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

adminroute.get('/viewappointment',async(req,res)=>{
    const viewall=await appointments.find();
    console.log(viewall);
    if (!viewall){
        res.status(201).json({Messag:"no appointments yet !" })
    }
    else{
        res.status(200).json(viewall)
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
export {adminroute};