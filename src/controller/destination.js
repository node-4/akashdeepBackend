const Destination = require('../model/destination'); // Replace the path to the destination model with your actual file path

// Create a new destination
exports.createDestination = async (req, res) => {
  try {
    const newDestination = new Destination(req.body);
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    if (!destinations) {
      return res.status(404).json({ message: 'destination not found' });
    }
    res
    .status(200)
    .json({ message: "success", data: destinations })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a destination by ID
exports.updateDestinationById = async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDestination) {
      return res.status(404).json({ message: 'destination not found' });
    }
    res
    .status(200)
    .json({ message: "success", data: updatedDestination })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a destination by ID
exports.deleteDestinationById = async (req, res) => {
  try {
    await Destination.findByIdAndRemove(req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
