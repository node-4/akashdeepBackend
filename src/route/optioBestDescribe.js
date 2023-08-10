const express = require('express');
const router = express.Router();
const optionBestDescribeController = require('../controller/optionBestDescribeYou'); // Replace the path to the optionBestDescribe controller with your actual file path

// Route to create a new optionBestDescribe
router.post('/', optionBestDescribeController.createOptionBestDescribe);

// Route to get all optionBestDescribe
router.get('/', optionBestDescribeController.getAllOptionBestDescribe);

// Route to get optionBestDescribe by ID
router.get('/:id', optionBestDescribeController.getOptionBestDescribeById);

// Route to update optionBestDescribe by ID
router.put('/:id', optionBestDescribeController.updateOptionBestDescribeById);

// Route to delete optionBestDescribe by ID
router.delete('/:id', optionBestDescribeController.deleteOptionBestDescribeById);

module.exports = router;
