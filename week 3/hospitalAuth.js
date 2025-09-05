const express = require("express");
const app = express();

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if (!(username === "sagar" && password === "pass")) {
    res.status(400).json({
      msg: "Wrong user/pass",
    });
    return;
  } else {
    next();
  }
}

function kidneyMiddleware(req, res, next) {
  const kidneyId = req.query.kidneyId;
  if (kidneyId != 1 && kidneyId != 2) {
    res.json({
      msg: "Somethings up with the inputs",
    });
    return;
  } else {
    next();
  }
}

app.get("/health-checkup", userMiddleware, kidneyMiddleware, (req, res) => {
  // logic

  res.json({
    msg: "Your kidney is fine",
  });
});

app.listen(3000);




// Without middlewares

// app.get("/health-checkup", (req, res) => {
//   const username = req.headers.username;
//   const password = req.headers.password;
//   const kidneyId = req.query.kidneyId;

//   if (!(username === "sagar" && password === "pass")) {
//     res.status(400).json({
//       msg: "Wrong user/pass",
//     });
//     return;
//   }
//   if (kidneyId != 1 && kidneyId != 2) {
//     res.json({
//       msg: "Somethings up with the inputs",
//     });
//     return;
//   }

//   res.json({
//     msg:"Your kidney is fine"
//   })
// });