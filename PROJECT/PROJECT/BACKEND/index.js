import express,{json} from 'express';
import { adminroute } from './Routes/adminRoutes.js';
import { userroute } from './Routes/userRoutes.js';
import dotenv from 'dotenv';
//import cors from 'cors';
import cookieparser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(cookieparser());
app.use(json())
app.use('/',adminroute)
app.use('/',userroute)
const port=process.env.port;
// app.use(cors({origin:'http://127.0.0.1:5500',
//     credentials:true
//             //origin:"127.0.0.1:8000" port specify cheyith kodukam
// }))

app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})