import express,{json} from "express"
import {adminroute} from './Routes/adminroutes.js'
const app =express();
app.use(json());
app.use('/',adminroute);
const port=8004;
app.listen(port,()=>{
    console.log(`server listen to the ${port}`)
})
