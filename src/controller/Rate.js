const Rate = require('../model/rate');

module.exports = {
  getRates: async function (req, res) {
    try {
      const rates = await Rate.find({});
      return res.json(rates);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  createRate: async function (req, res) {
    try {
      const rates = await Rate.findOne({ to_currency: req.body.to_currency, from_currency: req.body.from_currency, });
      if (rates) {
        return res.status(500).send('Rate already exists');
      }
      const newRate = new Rate(req.body);
      const rate = await newRate.save();
      return res.json(rate);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getRateById: async function (req, res) {
    try {
      const rate = await Rate.findById(req.params.id);
      if (!rate) {
        return res.status(404).send('Rate not found');
      }
      return res.json(rate);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  updateRate: async function (req, res) {
    try {
      const rate1 = await Rate.findById(req.params.id);
      if (!rate1) {
        return res.status(404).send('Rate not found');
      }
      const rates = await Rate.findOne({ _id: { $ne: req.params.id }, to_currency: req.body.to_currency, from_currency: req.body.from_currency, });
      if (rates) {
        return res.status(500).send('Rate already exists');
      }
      const rate = await Rate.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
      if (!rate) {
        return res.status(404).send('Rate not found');
      }
      return res.json(rate);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deleteRate: async function (req, res) {
    try {
      const rate = await Rate.findByIdAndDelete(req.params.id);
      if (!rate) {
        return res.status(404).send('Rate not found');
      }
      return res.json({ message: 'Rate deleted successfully' });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};
