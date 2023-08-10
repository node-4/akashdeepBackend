const express = require("express");
const router = express.Router();
const enquiryController = require("../controller/enquiry");

// CREATE - POST request to create a new enquiry document
router.post("/createEnquiry", enquiryController.createEnquiry);

// READ - GET request to retrieve all enquiry documents
router.get("/", enquiryController.getAllEnquiries);

// READ - GET request to retrieve a specific enquiry document by ID
router.get("/:id", enquiryController.getEnquiryById);

// UPDATE - PUT request to update a specific enquiry document by ID
router.put("/:id", enquiryController.updateEnquiryById);

// DELETE - DELETE request to delete a specific enquiry document by ID
router.delete("/:id", enquiryController.deleteEnquiryById);

module.exports = router;
