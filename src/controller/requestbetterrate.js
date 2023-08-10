const BetterRate = require('../model/requestbetterrate');
const axios = require('axios');


exports.createBetterRate = async (req, res) => {
  try {
    const betterRate = new BetterRate(req.body);
    const result = await betterRate.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create better rate order.' });
  }
};

exports.getAllBetterRates = async (req, res) => {
  try {
    const betterRates = await BetterRate.find();
    res.json(betterRates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get better rate orders.' });
  }
};

exports.updateBetterRate = async (req, res) => {
  try {
    const { betterRateId } = req.params;
    const betterRate = await BetterRate.findByIdAndUpdate(betterRateId, req.body, { new: true });
    res.json(betterRate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update better rate order.' });
  }
};

exports.deleteBetterRate = async (req, res) => {
  try {
    const { betterRateId } = req.params;
    await BetterRate.findByIdAndDelete(betterRateId);
    res.json({ message: 'Better rate order deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete better rate order.' });
  }
};



// Route for converting a forex value to an INR amount
exports.convertRate = async (req, res) => {
// router.get('/convert/:currency/:forexAmount', async (req, res) => {
  try {
    const { currency, forexAmount } = req.params;
    
    // Make a request to an external currency conversion API
    const response = await axios.get(`https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${currency}&to=INR&amount=${forexAmount}`);

    console.log(response.data.value)
    // Extract the converted INR amount from the API response
    const inrAmount = response.data.value;

    res.json({ inrAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to convert forex amount to INR.' });
  }
}


exports.webhooks = async (req, res) => {
  // router.get('/convert/:currency/:forexAmount', async (req, res) => {
    try {
      const { currency, forexAmount } = req.params;
      
      // Make a request to an external currency conversion API
      const response = await axios.get(`https://api.cashfree.com/lrs/webhooks?api_key=375328a2de735cc1dfe8b6c115823573&from=${currency}&to=INR&amount=${forexAmount}`);
     
      console.log(response)
      // Extract the converted INR amount from the API response
      const inrAmount = response.data.response.value;
  
      res.json({ inrAmount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to convert forex amount to INR.' });
    }
  }

