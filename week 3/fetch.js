const express=require('express');
const app=express();

async function details(req,res,next) {
    const getData=await fetch("https://fakerapi.it/api/v1/persons");
    const finalData= await getData.json();
    req.finalData=finalData;
    next();
}
app.get("/",details,(req,res)=>{
    res.json(req.finalData);
})

app.listen(3000);