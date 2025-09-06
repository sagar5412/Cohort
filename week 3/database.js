const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://sagargkbly_db_user:5FULAaNySIW5PHOy@cluster0.viw2d0d.mongodb.net/testDatabase"
);

const User = mongoose.model("User", {
  email: String,
  password: String,
});

const app = express();
app.use(express.json());

// 🔹 SIGN IN
app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // check DB for existing user
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(403).json({
      msg: "User doesn't exist in our DB",
    });
  }

  // generate token
  const token = jwt.sign({ email }, jwtPassword);
  return res.json({ token });
});

// 🔹 GET USERS (except self)
app.get("/users", async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const email = decoded.email;

    // get all users except current one
    const users = await User.find({ email: { $ne: email } });
    res.json(users);
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
