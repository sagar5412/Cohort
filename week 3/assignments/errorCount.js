// const request = require('supertest');
// const assert = require('assert');
const express = require('express');

const app = express();
let errorCount = 0;

// Routes
app.get('/user', function(req, res) {
  throw new Error("User not found");
  // (this line will never run because of the throw)
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

// ✅ Global error-handling middleware
app.use((err, req, res, next) => {
  errorCount++;
  res.status(404).json({ msg: "Something went wrong" });
});

// module.exports = app;
app.listen(3000);