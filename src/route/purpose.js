const express = require("express");
const router = express.Router();
const purposeController = require("../controller/purpose");

// Create a new purpose
router.post("/", purposeController.createPurpose);

// Get all purposes
router.get("/", purposeController.getAllPurposes);

// Update the status of a purpose
router.put("/:purposeId", purposeController.updatePurposeStatus);

// Delete a purpose
router.delete("/:purposeId", purposeController.deletePurpose);

module.exports = router;
