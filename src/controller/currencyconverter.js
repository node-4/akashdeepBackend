const CurrencyConverterr = require('../model/currencyconverter'); // Assuming the Currencyconverter model is defined in a separate file

// Create a new CurrencyConverter
exports.createCurrencyConverter = async (req, res) => {
  try {
    const { CurrencyConverter } = req.body;
    // Create a new CurrencyConverter document
    const newCurrencyConverter = await CurrencyConverterr.create({ CurrencyConverter });
    res.status(201).json({ success: true, data: newCurrencyConverter });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all CurrencyConverters
exports.getAllCurrencyConverters = async (req, res) => {
  try {
    const currencyConverters = await CurrencyConverterr.find();
    res.status(200).json({ success: true, data: currencyConverters });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a CurrencyConverter by ID
exports.updateCurrencyConverter = async (req, res) => {
  try {
    const { CurrencyConverter } = req.body;
    const currencyConverterId = req.params.id;
    // Find the CurrencyConverter document by ID and update its fields
    const updatedCurrencyConverter = await CurrencyConverterr.findByIdAndUpdate(
      currencyConverterId,
      { CurrencyConverter },
      { new: true }
    );
    if (!updatedCurrencyConverter) {
      return res.status(404).json({ success: false, error: 'CurrencyConverter not found' });
    }
    res.status(200).json({ success: true, data: updatedCurrencyConverter });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a CurrencyConverter by ID
exports.deleteCurrencyConverter = async (req, res) => {
  try {
    const currencyConverterId = req.params.id;
    // Find the CurrencyConverter document by ID and remove it
    const deletedCurrencyConverter = await CurrencyConverterr.findByIdAndRemove(currencyConverterId);
    if (!deletedCurrencyConverter) {
      return res.status(404).json({ success: false, error: 'CurrencyConverter not found' });
    }
    res.status(200).json({ success: true, data: deletedCurrencyConverter });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
