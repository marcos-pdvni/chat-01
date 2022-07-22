const express = require("express");

const path = require("path");

const router = express.Router();

// controller
const resetUser = require("../controller/reset");

router.post("/reset", resetUser.resetUserPassword);

router.get("/reset", (req, res) => {
  res.render(path.join(__dirname, "../views", "reset"));
});

module.exports = router;
