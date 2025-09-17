const mongoose = require("mongoose");
const app = require("express")();
const { todo } = require("../week-6-basics/db.cjs");
const cors = require("cors");
app.use(cors());
app.use(require("express").json());
// backend
app.get("/todos", async (req, res) => {
  // check valid Mongo ObjectId
  const id = req.query.id;

  const todoItem = await todo.findOne({id:id});
  if (!todoItem) {
    return res.status(404).json({ msg: "Todo not found" });
  }

  return res.json({ todo: todoItem });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
