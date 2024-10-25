import jwt from 'jsonwebtoken';
const secretkey="certiapp"; 
const user=new Map();
const authenticate=(req,res,next)=>{
const cookies=req.headers.cookie;
// console.log(cookies);
const cookie=cookies.split(';');

for(let cooki of cookie)
{
    const[name,token]=cooki.trim().split('=');
    if(name=="certiappauth")
    {
        const verified=jwt.verify(token,secretkey);
        // console.log(verified);
        req.role=verified.role;        
        const role=req.role;
        // console.log(role);
        
    }
}
next();
}
export{authenticate};