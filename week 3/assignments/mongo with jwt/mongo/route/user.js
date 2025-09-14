const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  try {
    await User.create({ username, password });
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: "Signup failed", details: err.message });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.json({
      msg: "Incorrect username and pass",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find({});

  res.json({
    course: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.username;
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  //   const user = await User.findOne({ username });

  //   if (user.purchasedCourses.includes(courseId)) {
  //     return res.status(400).json({ message: "Course already purchased" });
  //   }

  //   user.purchasedCourses.push(courseId);
  //   await user.save();

  res.json({
    message: "purchase complete",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.username,
  });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    courses: courses,
  });

  //   const user = await User.findOne({
  //     username: req.headers.username,
  //   }).populate("purchasedCourses");

  //   res.json({ courses: user.purchasedCourses });
});

module.exports = router;
