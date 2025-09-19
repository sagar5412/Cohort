const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Noti } = require("./db");
app.use(cors());

// app.get("/", async (req, res) => {
//   const random = Math.floor(Math.random() * 3) + 1;
//   console.log(random);
//   const data = await Noti.findOne({id: random});
//   if(!data){
//     return res.json({
//          network: 0,
//         jobs: 0,
//         messages: 0,
//         notification: 0,
//     })
//   }
//   res.json(data);
// });


app.get("/", async (req, res) => {
  const id = Number(req.query.id);   // ensure it's a number
  const data = await Noti.findOne({ id: id });
  if (!data) {
    return res.json({
      network: 0,
      jobs: 0,
      messages: 0,
      notification: 0
    })
  }
  res.json(data);
});


app.listen(3000);
