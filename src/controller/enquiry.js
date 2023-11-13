const enquiryModel = require("../model/enquiry");
// CREATE - POST request to create a new enquiry document
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new enquiryModel(req.body);
    const savedEnquiry = await enquiry.save();
    return res.status(201).json(savedEnquiry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// READ - GET request to retrieve all enquiry documents
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await enquiryModel.find();
    return res.json(enquiries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// READ - GET request to retrieve a specific enquiry document by ID
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await enquiryModel.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    return res.json(enquiry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// UPDATE - PUT request to update a specific enquiry document by ID
exports.updateEnquiryById = async (req, res) => {
  try {
    const enquiry = await enquiryModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, });
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    return res.json(enquiry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// DELETE - DELETE request to delete a specific enquiry document by ID
exports.deleteEnquiryById = async (req, res) => {
  try {
    const enquiry = await enquiryModel.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    return res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
