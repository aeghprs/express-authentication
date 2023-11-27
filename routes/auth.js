const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.handleNewUser);
router.post("/login", authController.handleUserLogin);

module.exports = router;