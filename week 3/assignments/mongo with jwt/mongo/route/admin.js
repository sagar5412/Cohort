const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const {JWT_SECRET}=require("../config");
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: username,
    password: password,
  });

  res.json({
    message: "Admin created succesfully",
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const admin = await Admin.find({
    username,
    password,
  });
  if (admin) {
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

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const price = req.body.price;

  const newCourse = await Course.create({
    title,
    price,
  });

  res.json({
    message: "Course created succesfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});

  res.json({
    courses: response,
  });
});

module.exports = router;
