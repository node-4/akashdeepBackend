const Service = require('../model/services'); // Assuming the services model is defined in a separate file
const Subservice = require('../model/subservices'); // Assuming the subservices model is defined in a separate file

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { services, subservices } = req.body;
    // Create a new service document
    const service = await Service.create({ services, subservices });
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all services with populated subservices
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('subservices');
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const { services, subservices } = req.body;
    const serviceId = req.params.id;
    // Find the service document by ID and update its fields
    const service = await Service.findByIdAndUpdate(
      serviceId,
      { services, subservices },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.status(200).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    // Find the service document by ID and remove it
    const service = await Service.findByIdAndRemove(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.status(200).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


