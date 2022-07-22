const express = require("express");

const router = express.Router();

// controller
const auth = require("../controller/auth");

router.post("/auth", auth.authUser);

module.exports = router;
