import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../middleware/auth.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
const userroute=Router();
const secretkey=process.env.secretkey;
const userschema=new mongoose.Schema({firstname:String,
                                      lastname:String,
                                      username:{type:String,unique:true},
                                      password:String,
                                      email:String
                                      })

const reservationschema=new mongoose.Schema({name:String,
                                             phoneno:String,
                                             username:String,
                                             count:Number,
                                             data:String,
                                             suggestion:String,
                                             time:String,
                                             email:String,
                                             tableid: Number
})

const tableSchema = new mongoose.Schema({tableId: Number, // Table number (1 to 4)
                                         availableSeats: Number,
                                         });

const messageschema=new mongoose.Schema({name:String,
                                         email:String,
                                         subject:String,
                                         message:String
                                        })

export const user=mongoose.model('userrdetails',userschema);
export const tableModel = mongoose.model('table', tableSchema);
export const reservation=mongoose.model('reservations',reservationschema)
export const Message=mongoose.model('messages',messageschema)
// Initialize tables if not already created
async function initializeTables() {
    for (let i = 1; i <= 4; i++) {
        await tableModel.updateOne(
            { tableId: i },
            { $setOnInsert: { tableId: i, availableSeats: 4 } },
            { upsert: true }
        );
    }
}
initializeTables();                                    
mongoose.connect('mongodb://localhost:27017/PROJECT');
// signup
userroute.post('/signup',async(req,res)=>{
    try{
    const data=req.body; //body le full sadhanavum data annu variable il store cheyithu
    const{firstname,lastname,username,password,email,role}=data
    const hashpassword=await bcrypt.hash(password,10)
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
            password:hashpassword,
            email:email,
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

//login
userroute.post('/login',async(req,res)=>{
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
        const isvalid=await bcrypt.compare(password,result.password)    
        if(isvalid){
         const token= jwt.sign ({username:username},secretkey,{expiresIn:"2h"});
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

// Find table
 userroute.get('/table', async (req, res) => {
//     //const tableId = req.query.tableid;// Changed to camelCase
//     try {
//         const tableInfo = await tables.find(); // Use the correct model and property name
//         console.log(tableInfo);
//         if (tableInfo) {
//             res.status(200).json({ availableSeats: tableInfo.availableSeats });
//         } else {
//             res.status(404).json({ message: 'Table not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving table information', error: error.message });
//     }
try{
const allTables = await tableModel.find();
if (allTables.length > 0) {
    const availableSeats = allTables.map(table => ({
        tableId: table.tableId,
        availableSeats: table.availableSeats
    }));
    res.status(200).json(availableSeats);
} else {
    res.status(404).json({ message: 'No tables found' });
}

} catch (error) {
res.status(500).json({ message: 'Error retrieving table information', error: error.message });
}
});

userroute.post('/reservation', async (req, res) => {
    try {
        const reserv = req.body;
        const { name, phoneno, username, count, tableid, data, suggestion, time, email } = reserv;

        // Check if the table exists
        const table = await tableModel.findOne({ tableId: tableid });
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        // Check if the table is already reserved
        const existingReservation = await reservation.findOne({ tableid });
        if (existingReservation) {
            return res.status(400).json({ message: 'No table available' });
        }

        // Check if enough seats are available
        if (table.availableSeats < count) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Create a new reservation
        const newReservation = new reservation({
            name: name,
            phoneno: phoneno,
            username: username,
            count: count,
            tableid: tableid,
            data: data,
            suggestion: suggestion,
            time: time,
            email: email
        });

        await newReservation.save();

        // Update available seats
        table.availableSeats -= count;
        await table.save();

        res.status(200).json({ message: 'Reservation successful', newReservation });
    } catch (error) {
        res.status(500).json({ message: 'Error during reservation', error: error.message });
    }
});
// //view reservation 
userroute.get('/viewreservation', async (req, res) => {
    try {
        const username = req.query.username;
        
        // Find reservation based on the username
        const existing = await reservation.findOne({ username: username });
        console.log(existing);
        
        if (existing) {
            console.log('Viewing reservation details:');
            console.log(existing);
            res.status(200).json(existing); // Send the reservation details as JSON
        } else {
            res.status(404).json({ message: 'No reservation found. Please sign up first!' });
            console.log('No reservation found. Please sign up first!');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservation', error: error.message });
        console.error('Error retrieving reservation:', error);
    }
});

// //message
userroute.post('/message', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Check if user with the provided email exists
        const checkuser = await user.findOne({ email });
        console.log("User found:", checkuser);

        if (checkuser) {
            // User exists, proceed to save the message
            const newMessage = new Message({
                name: name,
                email: email,
                subject: subject,
                message: message
            });

            await newMessage.save();
            console.log('Message saved successfully');
            res.status(200).json({ message: 'Got your message, thank you' });
        } else {
            // User not found, ask them to sign up
            res.status(404).json({ message: 'You need to sign up first!' });
            console.log('User not found - please sign up first');
        }
    } catch (error) {
        // Log and return the error
        console.error("Error in /message route:", error);
        res.status(500).json({ message: 'Error processing message', error: error.message });
    }
});


//view message
userroute.get('/viewmessage',async(req,res)=>{
    const email=req.query.email;
    const existing=await Message.findOne({email})
    if(existing){
        console.log('view course details here ')
        console.log(existing);
        // res.send('veiw course details in console');
        res.send(existing);
     
    }
    else{
        res.send('you have signup first!');
        console.log('you have signup first !');
    }
});
export{userroute};