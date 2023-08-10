const enquiryModel = require("../model/enquiry");

// CREATE - POST request to create a new enquiry document
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new enquiryModel(req.body);
    const savedEnquiry = await enquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - GET request to retrieve all enquiry documents
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await enquiryModel.find();
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - GET request to retrieve a specific enquiry document by ID
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await enquiryModel.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - PUT request to update a specific enquiry document by ID
exports.updateEnquiryById = async (req, res) => {
  try {
    const enquiry = await enquiryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - DELETE request to delete a specific enquiry document by ID
exports.deleteEnquiryById = async (req, res) => {
  try {
    const enquiry = await enquiryModel.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
