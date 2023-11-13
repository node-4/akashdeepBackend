const remitt = require("../model/remiiter1");
const axios = require("axios");
const Beneficiary = require("../model/beneficiary");
const orderr = require("../model/order");
const userModel = require("../model/remitter");
exports.createRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const { remitter, beneficiary, order } = req.body;
    if (!remitter) {
      return res.status(400).json({ error: "Remitter data not provided" });
    }
    if (!beneficiary) {
      return res.status(400).json({ error: "Beneficiary data not provided" });
    }
    if (!order) {
      return res.status(400).json({ error: "Order data not provided" });
    }
    const newRemitter = new remitt(remitter);
    const savedRemitter = await newRemitter.save();
    const newBeneficiary = new Beneficiary(beneficiary);
    const savedBeneficiary = await newBeneficiary.save();
    const newOrder = new orderr(order);
    newOrder.remitterid = savedRemitter._id;
    newOrder.beneficiaryid = savedBeneficiary._id;
    const savedOrder = await newOrder.save();
    return res.status(201).json({
      remitter: savedRemitter,
      beneficiary: savedBeneficiary,
      order: savedOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.getRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const populatedOrder = await orderr.findById({ _id: req.params.id }).populate("remitterid beneficiaryid");
    return res.status(201).json({ order: populatedOrder, });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.getAllRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const populatedOrder = await orderr.find().populate("remitterid beneficiaryid");
    return res.status(201).json({ order: populatedOrder, });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const { remitterId, beneficiaryId, orderId } = req.params;
    const { remitter, beneficiary, order } = req.body;
    if (remitter) {
      const updatedRemitter = await remitt.findByIdAndUpdate({ _id: remitterId }, { $set: remitter }, { new: true });
      if (!updatedRemitter) {
        return res.status(404).json({ error: "Remitter not found" });
      }
    }
    if (beneficiary) {
      const updatedBeneficiary = await Beneficiary.findByIdAndUpdate({ _id: beneficiaryId }, { $set: beneficiary }, { new: true });
      if (!updatedBeneficiary) {
        return res.status(404).json({ error: "Beneficiary not found" });
      }
    }
    if (order) {
      const updatedOrder = await orderr.findByIdAndUpdate({ _id: orderId }, { $set: order }, { new: true, });
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
    }
    return res.status(200).json({ message: "Remitter, Beneficiary, and Order updated successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
exports.deleteRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const { remitterId, beneficiaryId, orderId } = req.params;
    const deletedRemitter = await remitt.findByIdAndDelete(remitterId);
    if (!deletedRemitter) {
      return res.status(404).json({ error: "Remitter not found" });
    }
    const deletedBeneficiary = await Beneficiary.findByIdAndDelete(beneficiaryId);
    if (!deletedBeneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }
    const deletedOrder = await orderr.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.status(200).json({ message: "Remitter, Beneficiary, and Order deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
