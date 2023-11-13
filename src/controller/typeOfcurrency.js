const TypeOfCurrency = require('../model/typeOfCurrency');

exports.getAllCurrencies = async (req, res) => {
  try {
    const currencies = await TypeOfCurrency.find();
    return res.status(200).json({ msg: currencies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
exports.getCurrencyById = async (req, res) => {
  try {
    const currency = await TypeOfCurrency.findById(req.params.id);
    if (!currency) {
      return res.status(404).json({ message: 'Currency not found.' });
    }
    return res.status(200).json({ msg: currency });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
exports.createCurrency = async (req, res) => {
  try {
    const { currencyType } = req.body;
    const newCurrency = await TypeOfCurrency.create({ currencyType });
    return res.status(201).json({ message: 'Currency created successfully', currency: newCurrency });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
exports.updateCurrency = async (req, res) => {
  try {
    const { currencyType } = req.body;
    const currency = await TypeOfCurrency.findByIdAndUpdate(
      req.params.id,
      { currencyType },
      { new: true }
    );
    if (!currency) {
      return res.status(404).json({ message: 'Currency not found.' });
    }
    return res.status(200).json({ currency });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
exports.deleteCurrency = async (req, res) => {
  try {
    const currency = await TypeOfCurrency.findByIdAndDelete(req.params.id);
    if (!currency) {
      return res.status(404).json({ message: 'Currency not found.' });
    }
    return res.status(200).json({ message: 'Currency deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
