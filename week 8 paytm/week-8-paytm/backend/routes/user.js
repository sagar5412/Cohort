const express = require("express");
const router = express.Router();
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const {
  userValidate,
  userCheck,
  authMiddleware,
  validateUpdateUser,
} = require("../middleware/user");
const bcrypt = require("bcrypt");

router.post("/signup", userValidate, async (req, res) => {
  const { username, firstName, lastName, email, password } = req.validatedData;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    const userId = user._id;
    await Account.create({
      userId,
      balance: 1 + Math.floor(1 + Math.random() * 10000),
    });

    const token = jwt.sign(
      {
        id: userId,
      },
      JWT_SECRET
    );
    res.status(201).json({
      msg: "User created successfully",
      token: token,
    });
  } catch (error) {
    res.status(411).json({
      msg: "Server not responding",
    });
  }
});

router.post("/signin", userCheck, (req, res) => {
  const id = req.id;
  try {
    const token = jwt.sign(
      {
        id,
      },
      JWT_SECRET
    );
    res.status(201).json({
      msg: "Login/signin successfull",
      token: token,
    });
  } catch (error) {
    return res.status(411).json({
      msg: "Server not responding",
    });
  }
});

router.put("/", authMiddleware, validateUpdateUser, async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.validatedData;
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (username) updateData.username = username;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    const id = req.id;
    const updateUser = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateData,
      },
      {
        new: true,
      }
    ).select("-password");
    res.json({
      updateUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Server error",
    });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  try {
    if (!filter) {
      return res.json({
        user: [],
      });
    }
    const userData = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: filter,
            $options: "i",
          },
        },
      ],
    });
    res.json({
      users: userData.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server error",
    });
  }
});

module.exports = router;
