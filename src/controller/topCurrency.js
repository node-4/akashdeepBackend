const TopCurrency = require('../model/topCurrency'); // Assuming the topCurrency model is defined in a separate file

// Create a new topCurrency
exports.createTopCurrency = async (req, res) => {
  try {
    const { topCurrency } = req.body;
    // Create a new topCurrency document
    const newTopCurrency = await TopCurrency.create({ topCurrency });
    res.status(201).json({ success: true, data: newTopCurrency });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all topCurrencies
exports.getAllTopCurrencies = async (req, res) => {
  try {
    const topCurrencies = await TopCurrency.find();
    res.status(200).json({ success: true, data: topCurrencies });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a topCurrency by ID
exports.updateTopCurrency = async (req, res) => {
  try {
    const { topCurrency } = req.body;
    const topCurrencyId = req.params.id;
    // Find the topCurrency document by ID and update its fields
    const updatedTopCurrency = await TopCurrency.findByIdAndUpdate(
      topCurrencyId,
      { topCurrency },
      { new: true }
    );
    if (!updatedTopCurrency) {
      return res.status(404).json({ success: false, error: 'TopCurrency not found' });
    }
    res.status(200).json({ success: true, data: updatedTopCurrency });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a topCurrency by ID
exports.deleteTopCurrency = async (req, res) => {
  try {
    const topCurrencyId = req.params.id;
    // Find the topCurrency document by ID and remove it
    const deletedTopCurrency = await TopCurrency.findByIdAndRemove(topCurrencyId);
    if (!deletedTopCurrency) {
      return res.status(404).json({ success: false, error: 'TopCurrency not found' });
    }
    res.status(200).json({ success: true, data: deletedTopCurrency });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
