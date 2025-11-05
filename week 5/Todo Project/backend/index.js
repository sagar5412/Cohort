const express=require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app=express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/todos",async (req,res)=>{
    const createPayload = req.body;
    const parsedPlayload = createTodo.safeParse(createPayload);
    if(!parsedPlayload.success){
        res.status(411).json({
            msg:"you have sent wrong inputs"
        })
        return;
    }

    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed: false
    })

    res.json({
        msg:"Todo created"
    })
})

app.get("/todos",async(req,res)=>{
    const todos = await todo.find({});
    res.json({
        todos
    })
})

app.put("/completed",async(req,res)=>{
    const updatedPayload = req.body;
    const parsedPlayload = updateTodo.safeParse(updatedPayload);
     
    if(!parsedPlayload.success){
        res.status(411).json({
            msg:"you have sent wrong inputs"
        })
        return;
    }
    await todo.updateOne({
        _id : req.body.id
    }, {
        completed:true
    })

    res.json({
        msg:"Todo marked as complete"
    })
})

app.listen(3000);