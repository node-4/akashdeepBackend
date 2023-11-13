const CurrencyConverterr = require('../model/currencyconverter');
exports.createCurrencyConverter = async (req, res) => {
  try {
    const { CurrencyConverter } = req.body;
    const newCurrencyConverter = await CurrencyConverterr.create({ CurrencyConverter });
    return res.status(201).json({ success: true, data: newCurrencyConverter });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
exports.getAllCurrencyConverters = async (req, res) => {
  try {
    const currencyConverters = await CurrencyConverterr.find();
    return res.status(200).json({ success: true, data: currencyConverters });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
exports.updateCurrencyConverter = async (req, res) => {
  try {
    const { CurrencyConverter } = req.body;
    const currencyConverterId = req.params.id;
    const updatedCurrencyConverter = await CurrencyConverterr.findByIdAndUpdate({ _id: currencyConverterId }, { $set: CurrencyConverter }, { new: true });
    if (!updatedCurrencyConverter) {
      return res.status(404).json({ success: false, error: 'CurrencyConverter not found' });
    }
    return res.status(200).json({ success: true, data: updatedCurrencyConverter });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
exports.deleteCurrencyConverter = async (req, res) => {
  try {
    const currencyConverterId = req.params.id;
    const deletedCurrencyConverter = await CurrencyConverterr.findByIdAndRemove(currencyConverterId);
    if (!deletedCurrencyConverter) {
      return res.status(404).json({ success: false, error: 'CurrencyConverter not found' });
    }
    return res.status(200).json({ success: true, data: deletedCurrencyConverter });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
