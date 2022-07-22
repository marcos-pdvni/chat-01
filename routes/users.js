const express = require("express");

const router = express.Router();

// controller
const getUser = require("../controller/users");

router.get("/users/:id", getUser.getUser);

module.exports = router;
