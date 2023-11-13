const Purpose = require("../model/purpose");

// Controller for creating a new purpose
exports.createPurpose = async (req, res) => {
  try {
    const { purpose, desc, status } = req.body;
    const purposee = await Purpose.findOne({ purpose: purpose, });
    if (purposee) {
      return res.status(404).send("this purpose is already exist");
    }
    const newPurpose = new Purpose({ purpose, desc, status });
    await newPurpose.save();
    return res.status(201).json(newPurpose);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create purpose" });
  }
};

// Controller for getting all purposes
exports.getAllPurposes = async (req, res) => {
  try {
    const purposes = await Purpose.find();
    return res.status(200).json({ msg: purposes });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch purposes" });
  }
};

// Controller for updating the status of a purpose
exports.updatePurposeStatus = async (req, res) => {
  try {
    const { purposeId } = req.params;
    const { status } = req.body;
    const updatedPurpose = await Purpose.findByIdAndUpdate({ _id: purposeId }, { $set: status }, { new: true });
    return res.status(200).json(updatedPurpose);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update purpose status" });
  }
};

// Controller for deleting a purpose
exports.deletePurpose = async (req, res) => {
  try {
    const { purposeId } = req.params;
    await Purpose.findByIdAndRemove(purposeId);
    return res.status(200).json({ message: "Purpose deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete purpose" });
  }
};
