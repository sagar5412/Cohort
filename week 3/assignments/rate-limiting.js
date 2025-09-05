// const request = require('supertest');
// const assert = require('assert');
const express = require('express');
const app = express();

let numberOfRequestsForUser = {};
setInterval(() => {
  numberOfRequestsForUser = {};
}, 10000);

// ✅ Global middleware for rate limiting
app.use((req, res, next) => {
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(400).json({ msg: "user-id header required" });
  }

  // initialize counter for user if not exists
  if (!numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId] = 0;
  }

  numberOfRequestsForUser[userId]++;

  if (numberOfRequestsForUser[userId] > 5) {
    return res.status(404).json({ msg: "Too many requests" });
  }

  next();
});

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

// module.exports = app;
app.listen(3000);