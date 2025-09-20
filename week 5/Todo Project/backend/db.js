const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://sagargkbly_db_user:5FULAaNySIW5PHOy@cluster0.viw2d0d.mongodb.net/TodoApp')

const todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todo = mongoose.model('todos',todoSchema);

module.exports = {
    todo
}