const express = require("express");
const router = express.Router();
const UserController = require("../controller/aadhar");

router.post("/", UserController.addharotp);

router.post("/verifyotp", UserController.verifyotp)

module.exports = router;
