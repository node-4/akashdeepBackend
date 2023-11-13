const Destination = require('../model/destination');

exports.createDestination = async (req, res) => {
  try {
    const newDestination = new Destination(req.body);
    const savedDestination = await newDestination.save();
    return res.status(201).json(savedDestination);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    if (!destinations) {
      return res.status(404).json({ message: 'destination not found' });
    }
    return res.status(200).json({ message: "success", data: destinations })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.updateDestinationById = async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    if (!updatedDestination) {
      return res.status(404).json({ message: 'destination not found' });
    }
    return res.status(200).json({ message: "success", data: updatedDestination })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.deleteDestinationById = async (req, res) => {
  try {
    await Destination.findByIdAndRemove(req.params.id);
    return res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
