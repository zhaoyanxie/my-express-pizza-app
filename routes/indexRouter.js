const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello Pizza World!");
});

module.exports = router;
