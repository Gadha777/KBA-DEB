import express,{json} from 'express';
import bcrypt from 'bcrypt';

const app=express();
app.use(json())
const port=8000;
const user= new Map();


app.get('/',(req,res)=>{
    res.send("Hello world");
});


app.post('/signup',async(req,res)=>{
    console.log("hi");
    // console.log(req.body);full print cheyiyan
    const data=req.body; //full sadhanavum data annu variable il store cheyithu
    console.log(data.firstname); // data il innu firstname mathram print akki
    //const fname=data.firstname //aa firstname fname annu variable il store akki
    const{firstname,//eganeyum cheyiyum
        lastname,
        username,
        password,
        role}=data
    console.log(lastname);

    const newp=await bcrypt.hash(password,10)
    console.log(newp);

     // Check if the user data already exists in the Map
        if (user.has(username)){
           res.status(201).json({ Message: "The user with these details already exists" });
        }
        else{
            user.set(username,{firstname,lastname,username,password:newp,role})
            console.log(user.get(username));
            //res.status(201).send("data saved");
            res.status(201).json({Message:"data saved"})
        }
   


});


app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})