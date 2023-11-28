const express = require("express");
const router = express.Router();

const helloController = require("../controllers/helloController");
const verifyJWT = require("../utils/tokenHandler");

router.get("/hello", verifyJWT, helloController.sendHelloResponse);

module.exports = router;
