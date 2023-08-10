const alertModel = require('../model/setanalert');

exports.createAlert = async (req, res) => {
  try {
    const newAlert = new alertModel({
      alert: req.body.alert,
      currency: req.body.currency,
      product: req.body.product,
      city: req.body.city,
      IsBetterThen: req.body.IsBetterThen,
      emailAt: req.body.emailAt,
      call_sms: req.body.call_sms
    });

    const savedAlert = await newAlert.save();
    res.status(201).json(savedAlert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await alertModel.find();
    res.status(200).json(alerts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateAlert = async (req, res) => {
  try {
    const updatedAlert = await alertModel.findByIdAndUpdate(
      req.params.alertId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAlert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteAlert = async (req, res) => {
  try {
    const deletedAlert = await alertModel.findByIdAndDelete(req.params.alertId);
    res.status(200).json(deletedAlert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
