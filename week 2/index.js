const express=require('express');
const app=express();
const port=3000;
const bodyParser= require('body-parser');
app.use(bodyParser.json());

app.get('/details',(req,res)=>{
    res.json({
        name: "sagar",
        age: 21
    })
})


app.post('/conversations',(req,res)=>{
    console.log(req.body);
    res.send("Hi this is post conversations")
})


app.get('/',(req,res)=>{

    res.send("Hello world")
})

app.listen(port, ()=>{
    console.log(`app listening in on post ${port}`);
})