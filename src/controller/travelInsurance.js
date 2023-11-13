const TravelInsurance = require("../model/travelInsurance");
const axios = require("axios");
const currencyModel = require("../model/bookthisorder/addcurrency");
const cityModel = require("../model/bookthisorder/selectcity");
const destination = require("../model/destination");

exports.createTravelInsurance = async (req, res) => {
  try {
    data = { destination: req.body.destination, startDate: req.body.startDate, endDate: req.body.endDate, };
    const destinationData = await destination.findById({ _id: data.destination, });
    console.log(destinationData.destination);
    let obj = { destination: data.destination, destinationName: destinationData.destination, startDate: data.startDate, endDate: data.endDate, };
    const travelInsurance = new TravelInsurance(obj);
    const savedTravelInsurance = await travelInsurance.save();
    return res.status(201).json(savedTravelInsurance);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.getAllTravelInsurances = async (req, res) => {
  try {
    const travelInsurances = await TravelInsurance.find();
    return res.status(200).json({ message: "get all", data: travelInsurances, })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.getAllTravelInsurancesById = async (req, res) => {
  try {
    const travelInsurances = await TravelInsurance.find({ _id: req.params.id })
    if (!travelInsurances) {
      return res.status(404).json({ success: false, error: 'travel not insurance' });
    }
    return res.status(200).json({ message: "get all", data: travelInsurances, })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.updateTravelInsuranceByIdPan = async (req, res) => {
  try {
    let productImage = [];
    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i]);
      const updatedTravelInsurance = await TravelInsurance.findOneAndUpdate({ _id: req.params.id }, { $push: { ageOfTraveller: req.body.ageOfTraveller, panCard: req.body.panCard, uploadPanCard: req.files[i].path, }, }, { new: true });
    }
    const updatedTravelInsurance1 = await TravelInsurance.findById({ _id: req.params.id, });
    return res.status(200).json({ message: "updated successfully.", data: updatedTravelInsurance1, });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.updateTravelInsuranceByIdPassport = async (req, res) => {
  try {
    let productImage = [];
    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i]);
      const updatedTravelInsurance = await TravelInsurance.findOneAndUpdate({ _id: req.params.id }, { $push: { passport: req.body.passport, uploadPassport: req.files[i].path, }, }, { new: true });
    }
    const updatedTravelInsurance1 = await TravelInsurance.findById({ _id: req.params.id, });
    return res.status(200).json({ message: "updated successfully.", data: updatedTravelInsurance1, });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.updateTravelInsuranceByIdTicket = async (req, res) => {
  try {
    let productImage = [];
    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i]);
      const updatedTravelInsurance = await TravelInsurance.findOneAndUpdate({ _id: req.params.id }, { $push: { ticketNumber: req.body.ticketNumber, uploadTicket: req.files[i].path, }, }, { new: true });
    }
    const updatedTravelInsurance1 = await TravelInsurance.findById({ _id: req.params.id, });
    return res.status(200).json({ message: "updated successfully.", data: updatedTravelInsurance1, });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.updateTravelInsuranceByIdVisa = async (req, res) => {
  try {
    let productImage = [];
    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i]);
      const updatedTravelInsurance = await TravelInsurance.findOneAndUpdate({ _id: req.params.id }, { $push: { visa: req.body.visa, uploadVisa: req.files[i].path, }, }, { new: true });
    }
    const updatedTravelInsurance1 = await TravelInsurance.findById({ _id: req.params.id, });
    return res.status(200).json({ message: "updated successfully.", data: updatedTravelInsurance1, });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
exports.deleteTravelInsuranceById = async (req, res) => {
  try {
    const deletedTravelInsurance = await TravelInsurance.findByIdAndRemove(req.params.id);
    return res.status(200).json(deletedTravelInsurance);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


