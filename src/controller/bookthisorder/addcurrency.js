const currencyModel = require('../../model/bookthisorder/addcurrency');

exports.createCurrency = async (req, res) => {
  try {
    const newCurrency = await currencyModel.create(req.body);
    res.status(201).json(newCurrency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getCurrencies = async (req, res) => {
  try {
    const currencies = await currencyModel.find();
    res.status(200).json(currencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getOverseasCurrencies = async (req, res) => {
  try {
    const currencies = await currencyModel.find({ type: "overseas" });
    res.status(200).json(currencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getOtherCurrencies = async (req, res) => {
  try {
    const currencies = await currencyModel.find({ type: "other" });
    res.status(200).json(currencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.updateCurrency = async (req, res) => {
  try {
    const updatedCurrency = await currencyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCurrency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.deleteCurrency = async (req, res) => {
  try {
    await currencyModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
