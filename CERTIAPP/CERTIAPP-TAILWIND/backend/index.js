import express, { json } from 'express';
import { adminroute } from './Routes/adminRoutes.js';


const app = express(); // Create an Express instance
app.use(json()); // Middleware to parse JSON request bodies
app.use('/',adminroute);
const port = 8002; 

app.post('/', (req, res) => { 
    // res.send("Request received"); 
});

app.listen(port, () => { // Start the server and listen on the specified port
    console.log(`Server is listening on port ${port}`); // Log a message indicating the server is running
});
