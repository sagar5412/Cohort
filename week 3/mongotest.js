const express=require("express");
const app=express();
app.use(express.json());

const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://sagargkbly_db_user:5FULAaNySIW5PHOy@cluster0.viw2d0d.mongodb.net/testDatabase")

const User=mongoose.model('Users', {
    email:String,
    password:String
});

app.post("/singup", async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const existing_user=await User.findOne({
        email:email
    })

    if(existing_user){
        return res.status(400).send("User already exists");
    }
    const user=new User({
        email:email,
        password:password
    });

    user.save();
    res.json({
        msg:"User created successfully"
    })
})


app.listen(3000);