import express,{json} from "express"
import {adminroute} from './Routes/adminRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app =express();
app.use(
    cors({ 
      origin: "http://localhost:3000",
      credentials: true
    })
  );
app.use(json());
app.use(cookieParser());
app.use('/',adminroute);

const port=5000;
app.listen(port,()=>{
    console.log(`server listen to the ${port}`)
})


// const express = require("express");
// const { mongoose } = require("mongoose");
// const app = express();
// const cors = require("cors");
// const routes = require("./routes/routes");
// const auth = require('./routes/auth')
// const cookieParser = require('cookie-parser')

  
//   app.use(express.json());
//   app.use(cookieParser());
//   app.use("/", routes);
//   app.use("/", auth)
  

//   const PORT = 5000;
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
  
//   mongoose.connect("mongodb://localhost:27017/REACT_EXAM");
  
//   const database = mongoose.connection;
  
//   database.on("error", (error) => {
//     console.log(error);
//   });
  
//   database.once("connected", () => {
//     console.log("Database Connected");
//   });  