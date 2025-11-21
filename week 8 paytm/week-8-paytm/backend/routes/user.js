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

// lodash.get equivalent
const get = (obj, path, defaultValue) => {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    current = current?.[key];
    if (current === undefined) return defaultValue;
  }
  return current;
};

router.post("/signup", userValidate, async (req, res) => {

  // ↓↓↓ SAFE ACCESS (prevents crash)
  const username = get(req, "validatedData.username", null);
  const firstName = get(req, "validatedData.firstName", null);
  const lastName = get(req, "validatedData.lastName", null);
  const email = get(req, "validatedData.email", null);
  const password = get(req, "validatedData.password", null);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await Account.create({
      userId: user._id,
      balance: 1 + Math.floor(1 + Math.random() * 10000),
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(201).json({
      msg: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(411).json({ msg: "Server not responding" });
  }
});

router.post("/signin", userCheck, (req, res) => {

  // ↓↓↓ safe: req.id might not exist
  const id = get(req, "id", null);

  if (!id) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  try {
    const token = jwt.sign({ id }, JWT_SECRET);

    res.status(201).json({
      msg: "Login/signin successful",
      token,
    });
  } catch (error) {
    return res.status(411).json({ msg: "Server not responding" });
  }
});

router.put("/", authMiddleware, validateUpdateUser, async (req, res) => {
  // ↓↓↓ safe access
  const firstName = get(req, "validatedData.firstName", null);
  const lastName = get(req, "validatedData.lastName", null);
  const username = get(req, "validatedData.username", null);
  const password = get(req, "validatedData.password", null);

  try {
    const updateData = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (username) updateData.username = username;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const id = get(req, "id", null);

    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json({ updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {

  // ↓↓↓ safe query extraction
  const filter = get(req, "query.filter", "");

  try {
    if (!filter) {
      return res.json({ users: [] });
    }

    const userData = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    // ↓↓↓ safe mapping
    const safeUsers = userData.map((user) => ({
      username: get(user, "username", ""),
      firstName: get(user, "firstName", ""),
      lastName: get(user, "lastName", ""),
      _id: get(user, "_id", null),
    }));

    res.json({ users: safeUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
