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

    // Check if beneficiary data is provided
    if (!beneficiary) {
      return res.status(400).json({ error: "Beneficiary data not provided" });
    }

    // Check if order data is provided
    if (!order) {
      return res.status(400).json({ error: "Order data not provided" });
    }

    // Create Remitter
    const newRemitter = new remitt(remitter);
    const savedRemitter = await newRemitter.save();

    // Create Beneficiary
    const newBeneficiary = new Beneficiary(beneficiary);
    const savedBeneficiary = await newBeneficiary.save();

    // Create Order
    const newOrder = new orderr(order);
    newOrder.remitterid = savedRemitter._id;
    newOrder.beneficiaryid = savedBeneficiary._id;
    const savedOrder = await newOrder.save();

    res.status(201).json({
      remitter: savedRemitter,
      beneficiary: savedBeneficiary,
      order: savedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.getRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const populatedOrder = await orderr
      .findById({ _id: req.params.id })
      .populate("remitterid beneficiaryid");

    res.status(201).json({
      order: populatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAllRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const populatedOrder = await orderr
      .find()
      .populate("remitterid beneficiaryid");

    res.status(201).json({
      order: populatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.updateRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const { remitterId, beneficiaryId, orderId } = req.params;
    const { remitter, beneficiary, order } = req.body;

    // Update Remitter
    if (remitter) {
      const updatedRemitter = await remitt.findByIdAndUpdate(
        remitterId,
        remitter,
        { new: true }
      );

      if (!updatedRemitter) {
        return res.status(404).json({ error: "Remitter not found" });
      }
    }

    // Update Beneficiary
    if (beneficiary) {
      const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(
        beneficiaryId ,
        beneficiary ,
        { new: true }
      );

      if (!updatedBeneficiary) {
        return res.status(404).json({ error: "Beneficiary not found" });
      }
    }

    // Update Order
    if (order) {
      const updatedOrder = await orderr.findByIdAndUpdate(orderId, order, {
        new: true,
      });

      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
    }

    res.status(200).json({ message: "Remitter, Beneficiary, and Order updated successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" })
  }
}



exports.deleteRemitterBeneficiaryOrder = async (req, res) => {
  try {
    const { remitterId, beneficiaryId, orderId } = req.params;

    // Delete Remitter
    const deletedRemitter = await remitt.findByIdAndDelete(remitterId);
    if (!deletedRemitter) {
      return res.status(404).json({ error: "Remitter not found" });
    }

    // Delete Beneficiary
    const deletedBeneficiary = await Beneficiary.findByIdAndDelete(beneficiaryId);
    if (!deletedBeneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }

    // Delete Order
    const deletedOrder = await orderr.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Remitter, Beneficiary, and Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
