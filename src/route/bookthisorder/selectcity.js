const express = require('express');
const router = express.Router();
const cityController = require('../../controller/bookthisorder/selectcity');

// CREATE a new city
router.post('/cities', cityController.createCity);

// READ all cities
router.get('/cities', cityController.getCity);
router.get('/getState', cityController.getState);
router.get('/getOtherCountry', cityController.getOtherCountry);
router.get('/getOverseasCountry', cityController.getOverseasCountry);
router.get('/getCitybyType/:type', cityController.getCitybyType);
router.get('/getCityforDelhiNcr', cityController.getCityforDelhiNcr);

// UPDATE a city
router.put('/cities/:id', cityController.updateCity);

// DELETE a city
router.delete('/cities/:id', cityController.deleteCity);

module.exports = router;
