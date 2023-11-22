const express = require('express');
const router = express.Router();
const cityController = require('../../controller/bookthisorder/selectcity');

// CREATE a new city
router.post('/cities', cityController.createCity);

// READ all cities
router.get('/cities', cityController.getCity);
router.get('/getCitybyType/:type', cityController.getCitybyType);

// UPDATE a city
router.put('/cities/:id', cityController.updateCity);

// DELETE a city
router.delete('/cities/:id', cityController.deleteCity);

module.exports = router;
