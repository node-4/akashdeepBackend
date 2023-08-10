const express = require('express');
const router = express.Router();
const servicesController = require('../controller/services'); // Assuming the services controller is defined in a separate file

// Create a new service
router.post('/', servicesController.createService);

// Get all services with populated subservices
router.get('/', servicesController.getAllServices);

// Update a service by ID
router.put('/:id', servicesController.updateService);

// Delete a service by ID
router.delete('/:id', servicesController.deleteService);

module.exports = router;
