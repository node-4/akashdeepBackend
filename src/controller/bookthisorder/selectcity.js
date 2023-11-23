const cityModel = require('../../model/bookthisorder/selectcity');

exports.createCity = async (req, res) => {
  try {
    const { selectcity, type } = req.body;
    const newCity = await cityModel.create({ selectcity, type });
    res.status(201).json(newCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCity = async (req, res) => {
  try {
    const cities = await cityModel.find();
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    res.status(201).json({ success: true, data: cities })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getCityforDelhiNcr = async (req, res) => {
  try {
    const cities = await cityModel.findOne({ selectcity: "Delhi/NCR", type: "city" });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    return res.status(201).json({ success: true, data: cities })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getCitybyType = async (req, res) => {
  try {
    const cities = await cityModel.find({ type: req.params.type });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    res.status(201).json({ success: true, data: cities })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectcity } = req.body;
    const updatedCity = await cityModel.findByIdAndUpdate(id, { selectcity }, { new: true });
    res.status(201).json({ success: true, data: updatedCity })
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    await cityModel.findByIdAndDelete(id);
    res.json({ message: 'City deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
