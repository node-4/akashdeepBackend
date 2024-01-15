const cityModel = require('../../model/bookthisorder/selectcity');

exports.createCity = async (req, res) => {
  try {
    const { selectcity, type, state, country } = req.body;
    if (type = "city") {
      const newCity = await cityModel.create({ selectcity, type, state, country });
      return res.status(201).json({ message: "city created", newCity });
    }
    if (type = "state") {
      const newCity = await cityModel.create({ selectcity, type, country });
      return res.status(201).json({ message: "State created", newCity });
    }
    if (type = "country") {
      const newCity = await cityModel.create({ selectcity, type });
      return res.status(201).json({ message: "City created", newCity });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.getCity = async (req, res) => {
  try {
    if (req.query.state != (null || undefined)) {
      const cities = await cityModel.find({ state: req.query.state, type: "city" });
      if (!cities) {
        return res.status(400).json({ error: "cities data not provided" });
      }
      return res.status(201).json({ success: true, data: cities })
    } else {
      const cities = await cityModel.find({ type: "city" });
      if (!cities) {
        return res.status(400).json({ error: "cities data not provided" });
      }
      return res.status(201).json({ success: true, data: cities })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getState = async (req, res) => {
  try {
    if (req.query.country != (null || undefined)) {
      const cities = await cityModel.find({ country: req.query.country, type: "state", });
      if (!cities) {
        return res.status(400).json({ error: "cities data not provided" });
      }
      return res.status(201).json({ success: true, data: cities })
    } else {
      const cities = await cityModel.find({ country: req.query.country, type: "state", });
      if (!cities) {
        return res.status(400).json({ error: "cities data not provided" });
      }
      return res.status(201).json({ success: true, data: cities })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getOtherCountry = async (req, res) => {
  try {
    const cities = await cityModel.find({ type: "country", countryType: "other" });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    return res.status(201).json({ success: true, data: cities })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getOverseasCountry = async (req, res) => {
  try {
    const cities = await cityModel.find({ type: "country", countryType: "overseas" });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    return res.status(201).json({ success: true, data: cities })
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
    return res.status(500).json({ message: err.message });
  }
};
exports.getCitybyType = async (req, res) => {
  try {
    const cities = await cityModel.find({ type: req.params.type });
    if (!cities) {
      return res.status(400).json({ error: "cities data not provided" });
    }
    return res.status(201).json({ success: true, data: cities })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectcity } = req.body;
    const updatedCity = await cityModel.findByIdAndUpdate(id, { selectcity }, { new: true });
    return res.status(201).json({ success: true, data: updatedCity })
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    await cityModel.findByIdAndDelete(id);
    res.json({ message: 'City deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
