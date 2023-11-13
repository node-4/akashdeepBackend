const Service = require('../model/services'); // Assuming the services model is defined in a separate file
const Subservice = require('../model/subservices'); // Assuming the subservices model is defined in a separate file

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { services, subservices } = req.body;
    const service = await Service.create({ services, subservices });
    return res.status(201).json({ success: true, data: service });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
// Get all services with populated subservices
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('subservices');
    return res.status(200).json({ success: true, data: services });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const { services, subservices } = req.body;
    const serviceId = req.params.id;
    const service = await Service.findByIdAndUpdate({ _id: serviceId }, { $set: { services, subservices } }, { new: true });
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    return res.status(200).json({ success: true, data: service });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findByIdAndRemove(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    return res.status(200).json({ success: true, data: service });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};


