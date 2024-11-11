import express, { json } from 'express';
import { adminroute } from './Routes/adminRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';



dotenv.config();

const app = express(); // Create an Express instance
app.use(cors({origin:'http://127.0.0.1:5500',credentials:true}))
app.use(cookieparser());
app.use(json()); // Middleware to parse JSON request bodies
app.use('/',adminroute);
const port = process.env.port; 

app.post('/', (req, res) => { 
    // res.send("Request received"); 
});

app.listen(port, () => { // Start the server and listen on the specified port
    console.log(`Server is listening on port ${port}`); // Log a message indicating the server is running
});
