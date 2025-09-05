const express=require('express');
const app=express();

app.use(express.json());

app.post('/health-checkup',(req,res)=>{
    const kidney=req.body.kidney;
    const kidneyLength=kidney.length;
    res.send("you have "+kidneyLength+" kidney");
})


// global cache
app.use((err,req,res,next)=>{
    res.json({
        msg:"Sorry something is up with our server"
    })
})

app.listen(3000);