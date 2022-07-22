const express = require("express");
const path = require("path");

const router = express.Router();

// middleware
const { auth } = require("../middlewares/auth");

router.get("/application", auth, (req, res) => {
  const userData = req.cookies.user;
  res.status(200).render(path.join(__dirname, "../views", "application"), {
    userData,
  });
});

module.exports = router;
