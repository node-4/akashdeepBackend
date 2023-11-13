const prepaidtravelModel = require("../../model/prepaidtravelcard/prepaidtravelcard");
const axios = require("axios");
const currencyModel = require("../../model/bookthisorder/addcurrency");
const cityModel = require("../../model/bookthisorder/selectcity");

exports.createPrepaidTravel_reload = async (req, res) => {
  try {
    let data = { selectCity: req.body.selectCity, currency: req.body.currency, forexAmount: req.body.forexAmount, buy_reload_unload: "reload" };
    const currenciesToChange = await currencyModel.findById({ _id: data.currency, });
    console.log(currenciesToChange.addcurrency);
    const cityData = await cityModel.findById({ _id: data.selectCity, });
    console.log(cityData.selectcity);
    const response = await axios.get(`https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${currenciesToChange.addcurrency}&to=INR&amount=${data.forexAmount}`);
    console.log(response.data.value);
    const ConvertedAmount = response.data.value;
    const total = response.data.value;
    let obj = { buy_reload_unload: data.buy_reload_unload, selectCity: data.selectCity, city: cityData.selectcity, currency: data.currency, currencyToChange: currenciesToChange.addcurrency, forexAmount: data.forexAmount, ConvertedAmountToINR: ConvertedAmount, total: total, };
    const prepaidtravel = new prepaidtravelModel(obj);
    const result = await prepaidtravel.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.findAllPrepaidcard_reload = async (req, res) => {
  try {
    const currencies = await prepaidtravelModel.find();
    if (!currencies) {
      return res.status(404).send("Prepaid Travel Card not found");
    }
    return res.status(200).json({ status: 200, message: "Order created successfully.", data: currencies, });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getPrepaidTravelById_reload = async (req, res) => {
  try {
    const prepaidtravel = await prepaidtravelModel.findById({ _id: req.params.id, });
    if (!prepaidtravel) {
      return res.status(404).send("Prepaid Travel Card not found");
    }
    return res.status(200).json({ status: 200, message: "prepaidtravel created successfully.", data: prepaidtravel, });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
exports.updatePrepaidTravelById_reload = async (req, res) => {
  try {
    console.log("hi");
    let panCard = req.files["pan"];
    let passportF = req.files["passportFront"];
    let passportB = req.files["passportBack"];
    let airtic = req.files["air"];
    let Valid = req.files["Visa"];
    req.body.uploadPanCard = panCard[0].path;
    req.body.PassportFront = passportF[0].path;
    req.body.PassportBack = passportB[0].path;
    req.body.airTicket = airtic[0].path;
    req.body.validVisa = Valid[0].path;
    const upda = await prepaidtravelModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { uploadPanCard: req.body.uploadPanCard, PassportFront: req.body.PassportFront, PassportBack: req.body.PassportBack, airTicket: req.body.airTicket, validVisa: req.body.validVisa, }, }, { new: true });
    if (!upda) {
      return res.status(404).json({ message: "travel card  not found" });
    } else {
      return res.status(200).json(upda);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updatePrepaidAccountDetails_reload = async (req, res) => {
  try {
    const prepaidtravel = await prepaidtravelModel.findById({ _id: req.params.id, });
    if (!prepaidtravel) {
      return res.status(404).send("Prepaid Travel Card not found");
    }
    let exchangeRate = prepaidtravel.ConvertedAmountToINR / prepaidtravel.forexAmount;
    const data = {
      data1: req.body.data1,
      data2: req.body.data2,
      exchangeRate: exchangeRate,
      transferAmountInFCY: req.body.transferAmountInFCY1,
      Total: prepaidtravel.total,
      RemittanceServiceCharge: req.body.RemittanceServiceCharge,
      GstOnCharge: req.body.GstOnCharge,
      GstOnCurrencyConversion: req.body.GstOnCurrencyConversion,
      TCS: req.body.TCS,
      TCS_flag: req.body.TCS_flag,
    };
    const TotalFundingAmtInINR = prepaidtravel.total + parseInt(data.transferAmountInFCY) + parseInt(data.RemittanceServiceCharge) + parseInt(data.GstOnCharge) + parseInt(data.GstOnCurrencyConversion) + parseInt(data.TCS) + parseInt(data.TCS_flag);
    const TotalOfAllChargesAndTaxes = parseInt(data.transferAmountInFCY) + parseInt(data.RemittanceServiceCharge) + parseInt(data.GstOnCharge) + parseInt(data.GstOnCurrencyConversion) + parseInt(data.TCS) + parseInt(data.TCS_flag);
    const currency = await prepaidtravelModel.findByIdAndUpdate({ _id: prepaidtravel._id }, { $set: { data1: data.data1, data2: data.data2, exchangeRate: data.exchangeRate, transferAmountInFCY: data.transferAmountInFCY, Total: data.Total, RemittanceServiceCharge: data.RemittanceServiceCharge, GstOnCharge: data.GstOnCharge, GstOnCurrencyConversion: data.GstOnCurrencyConversion, TCS: data.TCS, TCS_flag: data.TCS_flag, TotalFundingAmtInINR: TotalFundingAmtInINR, TotalOfAllChargesAndTaxes: TotalOfAllChargesAndTaxes, }, }, { new: true });
    return res.status(200).json({ status: 200, message: "prepaidtravel created successfully.", data: currency, });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.deletePrepaidTravelById_reload = async (req, res) => {
  try {
    const prepaidtravel = await prepaidtravelModel.findByIdAndDelete(req.params.id);
    if (!prepaidtravel) {
      return res.status(404).send("Prepaid Travel Card not found");
    }
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
