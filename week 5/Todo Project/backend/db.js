const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/myDatabase';
mongoose
  .connect(mongoURL)
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
