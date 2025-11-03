const mongoose = require("mongoose");

mongoose
  .connect("mongodb://mongo:27017/myDatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongodb connection error:", err));

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
