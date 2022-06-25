const express = require("express");
const router = express.Router();
const serverless = require('serverless-http');

router.get("/", (req, res) => {
  res.json("Server is running");
});

module.exports.handler = serverless(app);
