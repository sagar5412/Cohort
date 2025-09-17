const mongoose = require("mongoose");
const app = require("express")();
const { todo } = require("./db.cjs");
const cors = require("cors");
app.use(cors());
app.use(require("express").json());
// backend
app.get("/todos",async(req,res)=>{
    const todos = await todo.find({});
    res.json({
        todos
    })
})

app.listen(3000, () => {
  console.log("Server started on port 3000");
});