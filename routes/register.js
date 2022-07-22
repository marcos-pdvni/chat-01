const express = require("express");
const path = require("path");

const router = express.Router();

// controller
const register = require("../controller/register");

router.post("/register/user", register.createUser);

router.get("/register", (req, res) => {
  res.render(path.join(__dirname, "../views", "register"));
});

module.exports = router;
