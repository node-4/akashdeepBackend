const express = require("express");
const router = express.Router();
const enquiryController = require("../controller/enquirydropdown");

// CREATE - POST request to create a new enquiry document
router.post("/", enquiryController.createOption);

// READ - GET request to retrieve all enquiry documents
router.get("/", enquiryController.getAllOption);

// READ - GET request to retrieve a specific enquiry document by ID
router.get("/:id", enquiryController.getoptionById);

// UPDATE - PUT request to update a specific enquiry document by ID
router.put("/:id", enquiryController.updateoptionById);

// DELETE - DELETE request to delete a specific enquiry document by ID
router.delete("/:id", enquiryController.deleteoptionById);

module.exports = router;
