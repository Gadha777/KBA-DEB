import express, { json } from 'express';
import { adminroute } from './Routes/adminRoutes.js';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';


dotenv.config();
const app = express(); // Create an Express instance
app.use(cors({origin:'http://127.0.0.1:5500',
    credentials:true
            //origin:"127.0.0.1:8000" port specify cheyith kodukam
}))
app.use(json()); // Middleware to parse JSON request bodies
app.use('/',adminroute);
app.use(cookieparser());

const port = process.env.port; 

app.post('/', (req, res) => { 
    // res.send("Request received"); 
});

app.listen(port, () => { // Start the server and listen on the specified port
    console.log(`Server is listening on port ${port}`); // Log a message indicating the server is running
});
