const express = require('express');
const router = express.Router();
const controller = require('../controller/destination'); // Replace the path to your controller with your actual file path

// Create a new item
router.post('/', controller.createDestination);

// Get all items
router.get('/', controller.getAllDestinations);

// Get an item by ID
router.put('/:id', controller.updateDestinationById);

// Update an item by ID
router.delete('/:id', controller.deleteDestinationById);


module.exports = router;
