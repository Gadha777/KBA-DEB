import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { reservation,user,Message } from './adminroutes.js';
import { verifyToken } from "../middleware/authmiddleware.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";


dotenv.config();
const adminroute=Router();
// const secretkey=process.env.secretkey;
const userschema = new mongoose.Schema({
    username: { type: String, unique: true,  },
    password: { type: String, },
    email: { type: String, },
    userType: { type: String, },
  
  });

const menuschema=new mongoose.Schema({dishname:String,
                                      description:String,
                                      price:Number
})

const reservationschema=new mongoose.Schema({name:String,
                                             phoneno:String,
                                             username:String,
                                             count:Number,
                                             date:Date,
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

const user=mongoose.model('userdetails',userschema);   
const menu=mongoose.model('menudetials',menuschema); 
const tableModel = mongoose.model('table', tableSchema);
const reservation=mongoose.model('reservations',reservationschema)
const Message=mongoose.model('messages',messageschema)                                  
// Initialize Tables
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

mongoose.connect('mongodb://mongodb:27017/PROJECT');

// signup
adminroute.post('/register',async(req,res)=>{
    const userDetails = req.body;
    const {username,password,email}= userDetails;
    const hashpassword=await bcrypt.hash(password,10)
    // try{
     
      const found = await user.findOne({userType:"admin"})
      let userType="user";
      if(!found){
        userType="admin"
      }
   
    const existinguser=await user.findOne({username:username})
    // Check if the user data already exists in the collection user
        if (existinguser){
           res.status(201).json({ Message: "The user with these details already exists" });
        }
        else{
           const newuser= new user({
           username,password:hashpassword,email,userType
           });
           await newuser.save();
           console.log('successfully signedup');
            res.send("successfully signed up");
            res.status(200).json();
        }
    // }
    // catch(error){
    //     res.status(500).json(error);
    // }
});

adminroute.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username,password);
      const existinguser = await user.findOne({username: username });
      console.log(username,existinguser.userType);
      if (!existinguser) {
        return res
          .status(401)
          .json({ error: "Authentication failed- User doesn't exists" });
      }
  
      const passwordMatch = await bcrypt.compare(password, existinguser.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Authentication failed- password doesn't match" });
      }
  
      const token = jwt.sign(
        { userId: existinguser._id, userType: existinguser.userType },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );
  
      res.cookie("Authtoken", token, );
      res.json({
        status: true,
        message: "login success",
        userType: existinguser.userType
      });
      //  console.log('/login in the bakend res', res)
      return res;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
// Find table
adminroute.get('/table', async (req, res) => {
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

    adminroute.get('/available-tables', async (req, res) => {
        try {
            const availableTables = await tableModel.find({ availableSeats: { $gt: 0 } });
            res.status(200).json(availableTables);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching available tables', error: error.message });
        }
    });

// Add reservation
// Add reservation
adminroute.post('/reservation', async (req, res) => {
    try {
        const reserv = req.body;
        const { username, phoneno, count, tableid, date, suggestion, time, email } = reserv;

        console.log('Received reservation request:', reserv); // Debug log

        // Check if the table exists
        const table = await tableModel.findOne({ tableId: tableid });
        if (!table) {
            console.log('Table not found'); // Debug log
            return res.status(404).json({ message: 'Table not found' });
        }

        console.log('Table found:', table); // Debug log
        console.log('Available seats before reservation:', table.availableSeats); // Debug log

        // Check if the table is already reserved at the specified time
        const existingReservation = await reservation.findOne({ tableid, time });
        if (existingReservation) {
            console.log('Table already reserved for this time'); // Debug log
            return res.status(400).json({ message: 'Table already reserved for this time' });
        }

        // Check if enough seats are available
        if (table.availableSeats < count) {
            console.log('Not enough seats available'); // Debug log
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Create a new reservation
        const newReservation = new reservation({
            username: username,
            phoneno: phoneno,
            count: count,
            tableid: tableid,
            date: date,
            suggestion: suggestion,
            time: time,
            email: email
        });

        await newReservation.save();
        console.log('New reservation created:', newReservation); // Debug log

        // Update available seats
        table.availableSeats -= count;
        await table.save();

        console.log('Updated table available seats:', table.availableSeats); // Debug log

        res.status(200).json({ message: 'Reservation successful', newReservation });
    } catch (error) {
        console.error('Error during reservation:', error); // Debug log
        res.status(500).json({ message: 'Error during reservation', error: error.message });
    }
});

    adminroute.get('/viewreservations', async (req, res) => {
        try {
            const username = req.query.username;
    
            if (!username) {
                return res.status(400).json({ message: 'Username is required' });
            }
    
            // Find reservation based on the username
            const existing = await reservation.find({ username: username });
    
            if (existing.length>0) {
                console.log('Viewing reservation details:', existing);
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
    

// view all reservation
adminroute.get('/allreservations', async (req, res) => {
    try {
        const allReservations = await reservation.find(); // Fetch all reservations
        res.status(200).json(allReservations); // Return all reservation data in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
});

//add dish to menu
adminroute.post('/adddish',async(req,res)=>{
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

// Update a specific dish by its name
adminroute.put('/updatemenu/:dishname', async (req, res) => {
    const { dishname } = req.params; // Get the dishname from the URL parameter
    const updatedData = req.body; // The updated dish data from the frontend
    try {
      const updatedDish = await menu.findOneAndUpdate(
        { dishname }, // Find the dish by its name
        updatedData, // Update the dish with the new data
        { new: true } // Return the updated dish
      );
      if (!updatedDish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      res.status(200).json(updatedDish); // Return the updated dish details
    } catch (error) {
      res.status(500).json({ message: 'Error updating dish', error: error.message });
    }
  });
  
  
adminroute.post('/message', async (req, res) => {
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
adminroute.get('/viewmessage',async(req,res)=>{
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
adminroute.get('/allmenu/:dishname', async (req, res) => {
    const { dishname } = req.params; // Get the dishname from the URL parameter
    // const current = req.body;
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
adminroute.delete('/deletemenu', async (req, res) => {
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

adminroute.get('/logout', (req, res) => {
    try {
      // Clear session or token on the server side if applicable
      res.clearCookie('Authtoken'); // Clear the cookie on the server side
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Failed to logout' });
    }
  });
export{adminroute};