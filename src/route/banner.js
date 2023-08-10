const express = require('express');
const router = express.Router();
const bannerController = require('../controller/banner');

// Get all banners
router.get('/banners', bannerController.getAllBanners);

// Get one banner by ID
router.get('/banners/:id', bannerController.getBannerById);

// Create a new banner
router.post('/banners', bannerController.createBanner);

// Update a banner by ID
router.patch('/banners/:id', bannerController.updateBanner);

// Delete a banner by ID
router.delete('/banners/:id', bannerController.deleteBanner);

module.exports = router;
