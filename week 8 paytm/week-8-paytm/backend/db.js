const mongoose = require("mongoose");
const { email } = require("zod");
const { required, minLength, maxLength, lowercase, trim } = require("zod/mini");

mongoose.connect(
  "mongodb+srv://sagargkbly_db_user:5FULAaNySIW5PHOy@cluster0.viw2d0d.mongodb.net/Paytm"
);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 15,
      lowercase: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
  },
  {
    timestamps: true,
  }
);

const accountSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  balance:{
    type:Number,
    required:true
  }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account",accountSchema);

module.exports = {
  User,
  Account
};
