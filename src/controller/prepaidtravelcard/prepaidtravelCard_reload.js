const prepaidtravelModel = require("../../model/prepaidtravelcard/prepaidtravelcard");
const axios = require("axios");
const currencyModel = require("../../model/bookthisorder/addcurrency");
const cityModel = require("../../model/bookthisorder/selectcity");
const purposs = require("../../model/purpose");

exports.createPrepaidTravel_reload = async (req, res) => {
  try {
    let tcs = 0;
    let tcsFlag = true;
    let data = { selectCity: req.body.selectCity, currency: req.body.currency, forexAmount: req.body.forexAmount, buy_reload_unload: "reload" };
    const currenciesToChange = await currencyModel.findById({ _id: data.currency, });
    console.log(currenciesToChange.addcurrency);
    const cityData = await cityModel.findById({ _id: data.selectCity, });
    console.log(cityData.selectcity);
    const response = await axios.get(`https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${currenciesToChange.addcurrency}&to=INR&amount=${data.forexAmount}`);
    console.log(response.data.value);
    const ConvertedAmount = response.data.value;
    const total = response.data.value;
    const purposes = await purposs.findOne({ _id: req.body.purpose, })
    let obj = { buy_reload_unload: data.buy_reload_unload, purpose: purposes._id, purposeName: purposes.purpose, selectCity: data.selectCity, city: cityData.selectcity, currency: data.currency, currencyToChange: currenciesToChange.addcurrency, forexAmount: data.forexAmount, ConvertedAmountToINR: ConvertedAmount, total: total, };
    const prepaidtravel = new prepaidtravelModel(obj);
    const result = await prepaidtravel.save();

    const GstOnCharge = (result.total * 0.18).toFixed(2);
    const total1 = result.total;
    console.log(total1);
    let gstOnCurrencyConversion = 0;
    if (total1 <= 25000) {
      gstOnCurrencyConversion = "45";
    } else if (total1 <= 100000) {
      let a, b = 0;
      if (total1 <= 25000) {
        a = 45;
      } else {
        a = 45;
        b = ((0.18 / 100) * (total1 - 25000)).toFixed(2);
      }
      let c = Number(a) + Number(b);
      gstOnCurrencyConversion = c;
      console.log(gstOnCurrencyConversion);

    } else if (100000 < total1 <= 1000000) {
      let a;
      if (100000 < total1) {
        a = ((0.18 / 100) * 100000).toFixed(2);
      }
      let b = ((0.09 / 100) * (total1 - 100000)).toFixed(2);
      gstOnCurrencyConversion = Number(a) + Number(b);
    } else {
      b = (990 + ((0.018 / 100) * (total1 - 1000000))).toFixed(2);
      let c = Number(b);
      if (c > 10800) {
        gstOnCurrencyConversion = 10800
      } else {
        gstOnCurrencyConversion = c;
      }
      if (total1 > 700000) {
        if (result.purposeName === "education loan") {
          tcs = ((0.5 / 100) * total1).toFixed(2);
          tcsFlag = false;
        } else {
          switch (result.purposeName) {
            case "Education Abroad":
            case "Travel For Education":
            case "GIC payment to canada":
            case "Travel For Medical Treatment Abroad":
              tcs = ((5 / 100) * total1).toFixed(2);
              tcsFlag = false;
              break;
            default:
              tcs = ((20 / 100) * total1).toFixed(2);
              tcsFlag = false;
          }
        }
      }
    }
    const Total1OfAllCharges = (parseFloat(total1) + parseFloat(GstOnCharge) + parseFloat(gstOnCurrencyConversion) + (tcsFlag ? parseFloat(tcs) : parseFloat(tcs))).toFixed(2);
    const updatedCurrencyConverter = await prepaidtravelModel.findByIdAndUpdate({ _id: result._id }, { $set: { exchangeRate: result.ConvertedAmountToINR / result.total, transferAmountInFCY: result.ConvertedAmountToINR, remittenceServiceCharge: total, GstOnCharge: GstOnCharge, GstOnCurrencyConversion: gstOnCurrencyConversion, TCS: tcs, TCS_flag: tcsFlag, TotalFundingAmtInINR: Total1OfAllCharges, TotalOfAllCharges: parseFloat(GstOnCharge) + parseFloat(gstOnCurrencyConversion), }, }, { new: true });
    return res.status(201).json(updatedCurrencyConverter);
    // return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};


exports.updatebifurcation = async (req, res) => {
  try {
    const { exchangeRate, transferAmountInFCY, remittenceServiceCharge,/* totalFundingInINR,*//*  purpose,*/ } = req.body;
    const wiretravel = await wireTransferModel.findById({ _id: req.params.id, });
    if (!wiretravel) {
      return res.status(404).send("wiretravel Card not found");
    }
    const GstOnCharge = (remittenceServiceCharge * 0.18).toFixed(2);
    const total = parseFloat(exchangeRate) * parseFloat(wiretravel.recievingAmount);
    let gstOnCurrencyConversion = 0;
    if (total <= 25000) {
      gstOnCurrencyConversion = "45";
    } else if (total <= 100000) {
      let a = 0, b = 0;
      if (total <= 25000) {
        a = 45;
      } else {
        b = ((0.18 / 100) * (total - 25000)).toFixed(2);
      }
      let c = Number(a) + Number(b);
      gstOnCurrencyConversion = c;
    } else if (100000 < total <= 1000000) {
      let a;
      if (100000 < total) {
        a = ((0.18 / 100) * 100000).toFixed(2);
      }
      let b = ((0.09 / 100) * (total - 100000)).toFixed(2);
      gstOnCurrencyConversion = Number(a) + Number(b);
    } else {
      b = (990 + ((0.018 / 100) * (total - 1000000))).toFixed(2);
      let c = Number(b);
      if (c > 10800) {
        gstOnCurrencyConversion = 10800
      } else {
        gstOnCurrencyConversion = c;
      }
    }
    let tcs = 0;
    let tcsFlag = true;
    if (total > 700000) {
      if (wiretravel.purposeName === "education loan") {
        tcs = ((0.5 / 100) * total).toFixed(2);
        tcsFlag = false;
      } else {
        switch (wiretravel.purposeName) {
          case "Education Abroad":
          case "Travel For Education":
          case "GIC payment to canada":
          case "Travel For Medical Treatment Abroad":
            tcs = ((5 / 100) * total).toFixed(2);
            tcsFlag = false;
            break;
          default:
            tcs = ((20 / 100) * total).toFixed(2);
            tcsFlag = false;
        }
      }
    }
    const TotalOfAllCharges = (parseFloat(remittenceServiceCharge) + parseFloat(GstOnCharge) + parseFloat(gstOnCurrencyConversion) + (tcsFlag ? parseFloat(tcs) : parseFloat(tcs))).toFixed(2);
    const updatedCurrencyConverter = await wireTransferModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { exchangeRate: exchangeRate, transferAmountInFCY: transferAmountInFCY, remittenceServiceCharge: remittenceServiceCharge, GstOnCharge: GstOnCharge, GstOnCurrencyConversion: gstOnCurrencyConversion, tcs: tcs, tcsFlag: tcsFlag, totalFundingInINR: parseFloat(total) + parseFloat(TotalOfAllCharges), TotalOfAllCharges: TotalOfAllCharges, }, }, { new: true });
    return res.status(201).json(updatedCurrencyConverter);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

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
    // console.log("hi");
    // let panCard = req.files["pan"];
    // let passportF = req.files["passportFront"];
    // let passportB = req.files["passportBack"];
    // let airtic = req.files["air"];
    // let Valid = req.files["Visa"];
    // req.body.uploadPanCard = panCard[0].path;
    // req.body.PassportFront = passportF[0].path;
    // req.body.PassportBack = passportB[0].path;
    // req.body.airTicket = airtic[0].path;
    // req.body.validVisa = Valid[0].path;
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
exports.uploadImage = async (req, res) => {
  try {

    let image;
    if (req.file) {
      image = req.file.path
      return res.status(200).json({ status: 200, message: "image", data: image });
    } else {
      return res.status(404).json({ status: 404, message: "image not select", data: {} });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};