const express = require('express');
const app=express();
const cors = require('cors');
app.use(cors());
app.get("/sum",(req,res)=>{
    const a= req.query.a;
    const b=req.query.b;
    const sum=parseInt(a)+parseInt(b);
    res.send(sum.toString());
})

app.get("/SI",(req,res)=>{
    const p=parseInt(req.query.p);
    const t=parseInt(req.query.t);
    const r=parseInt(req.query.r);
    
    const SI=(p*t*r)/100;
    const amount=p+ SI;
    res.send({
        SI:SI,
        amount:amount
    })
})

app.listen(3000);
