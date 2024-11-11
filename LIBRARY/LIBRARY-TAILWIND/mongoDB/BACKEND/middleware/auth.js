import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secertkey=process.env.secertkey;
//const user= new Map();
const authenticate=(req,res,next)=>{
    const cookies=req.headers.cookie;

    // console.log(cookies);
    const cookie=cookies.split(';')
    for(let cooki of cookie){
        const [name,token]=cooki.trim().split('=');
        if(name=='lms'){
        const verified=jwt.verify(token,secertkey);
       // console.log(verified);
        // console.log("Username:", verified.username); 
        // console.log('name :', name);
        // console.log('token :',token)
        req.username=verified.username;
        req.userrole=verified.role;
        

        break;
        }
    }
    next();
}

    export{authenticate};