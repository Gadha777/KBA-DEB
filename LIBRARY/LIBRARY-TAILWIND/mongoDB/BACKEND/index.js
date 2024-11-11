import express, { json } from 'express';
import { adminroute } from './Routes/adminRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://127.0.0.1:5501',
    credentials: true,
}));

app.use(json());
app.use(cookieParser());

// Define routes after middleware
app.use('/', adminroute);

// Use a default port if process.env.port is not set
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

