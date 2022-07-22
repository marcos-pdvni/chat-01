const express = require("express");

const router = express.Router();

router.get("/logout", (req, res) => {
  res.clearCookie("uauth");
  res.clearCookie("user");
  res.status(200).redirect("/");
});

module.exports = router;
