const express = require("express");
const router = express.Router();
const UserController = require("../controller/pancard");

router.post("/", UserController.createpan);

// router.post("/verifyotp", UserController.verifyotp)

module.exports = router;
