const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://sagargkbly_db_user:5FULAaNySIW5PHOy@cluster0.viw2d0d.mongodb.net/Notifications')

const NotiSchema = new mongoose.Schema({
    id:Number,
    network:Number,
    jobs:Number,
    messages:Number,
    notification:Number
})

const Noti = mongoose.model('notis',NotiSchema);

module.exports = {
    Noti
}