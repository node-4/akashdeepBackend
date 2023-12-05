const prepaidtravelModel = require("../../model/prepaidtravelcard/prepaidtravelcard");
const axios = require("axios");
const currencyModel = require("../../model/bookthisorder/addcurrency");
const cityModel = require("../../model/bookthisorder/selectcity");
const purpose = require("../../model/purpose");

exports.createPrepaidTravel = async (req, res) => {
  try {
    data = { selectCity: req.body.selectCity, currency: req.body.currency, forexAmount: req.body.forexAmount, purpose: req.body.purpose, buy_reload_unload: "buy", };
    const currenciesToChange = await currencyModel.findById({ _id: data.currency, });
    console.log(currenciesToChange.addcurrency);
    const cityData = await cityModel.findById({ _id: data.selectCity, });
    console.log(cityData.selectcity);
    const purposee = await purpose.findById({ _id: data.purpose, });
    console.log(purposee.purpose);
    const response = await axios.get(`https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${currenciesToChange.addcurrency}&to=INR&amount=${data.forexAmount}`);
    console.log(response.data.value);
    const ConvertedAmount = response.data.value;
    const total = response.data.value;
    let obj = {
      buy_reload_unload: data.buy_reload_unload,
      selectCity: data.selectCity,
      city: cityData.selectcity,
      currency: data.currency,
      currencyToChange: currenciesToChange.addcurrency,
      forexAmount: data.forexAmount,
      ConvertedAmountToINR: ConvertedAmount,
      total: total,
      purpose: data.purpose,
      purposeName: purposee.purpose,
    };
    const prepaidtravel = new prepaidtravelModel(obj);
    const result = await prepaidtravel.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.findAllPrepaidcard = async (req, res) => {
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
exports.getPrepaidTravelById = async (req, res) => {
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
exports.updatePrepaidTravelById = async (req, res) => {
  try {
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
    const pan = req.body.panCard;
    const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG";
    const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84";
    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
      "x-cf-signature": 'La/YVfSLztWY57lteB5brZLw8iCnbh3S1u4OXWhPeLTpjnwX5XOlmvh1sLliKt8mVFPwRUgAdHZ7oVArBg4BXJNjHmIGofjKzs93nalv/dft6yyfXpXPLqpyTIsq6syxBIDKL85jK7orOP8zAH0Q9q7Ei5YCQhN7Nsud45Xgvvc3LAS9Hx05+WjAW3KBVbH1VVHbWilcbP5kzxUyaLgT78JhlL+nLaUbHXHR54ocQkcsWdeHE8SdRqIhtu92Gln6KwW8KJf36jchvHUdxAG72St7uvfZmxn0RsVkb+tpHWhCbJc3hH8bkwZru9D7RXOLLttZOQ7Y0cXzyafJPeCqXw==',
    }
    const response = await axios.post(
      "https://api.cashfree.com/verification/pan",
      { pan },
      {
        headers: headers,
      }
    );



    // // const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG";
    // // const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84";
    // const clientId = "CF370281CJOS20EHP6FSM6JOP5BG";
    // const clientSecret = "a9ce558e305335fb8eaadbb4703b6a7f8f5fd622";
    // const headers = { "x-api-version": "2023-03-01", "Content-Type": "application/json", "X-Client-ID": clientId, "X-Client-Secret": clientSecret, }
    // // const apiUrl = "https://api.cashfree.com/verification/pan";
    // const apiUrl = 'https://sandbox.cashfree.com/verification/pan';
    // const response = await axios.post(apiUrl, { pan }, { headers: headers, });
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);
    const upda = await prepaidtravelModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { panCard: pan, uploadPanCard: req.body.uploadPanCard, panStatus: response.data.pan_status, PassportFront: req.body.PassportFront, PassportBack: req.body.PassportBack, airTicket: req.body.airTicket, validVisa: req.body.validVisa, }, }, { new: true });
    if (!upda) {
      return res.status(404).json({ message: "travel card  not found" });
    } else {
      return res.status(200).json(upda);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.updatePrepaidAccountDetails = async (req, res) => {
  try {
    const data = { RemittanceServiceCharge: req.body.RemittanceServiceCharge, data1: req.body.data1, data2: req.body.data2, };
    const prepaidtravel = await prepaidtravelModel.findById({ _id: req.params.id, });
    if (!prepaidtravel) {
      return res.status(404).send("Prepaid Travel Card not found");
    }
    let exchangeRate = prepaidtravel.ConvertedAmountToINR / prepaidtravel.forexAmount;
    const GstOnCharge = (parseFloat(data.RemittanceServiceCharge) * 0.18).toFixed(2);
    const total = parseFloat(exchangeRate) * parseFloat(prepaidtravel.forexAmount);
    let gstOnCurrencyConversion = "";
    if (total <= 25000) {
      gstOnCurrencyConversion = "45";
    } else if (total <= 100000) {
      gstOnCurrencyConversion = ((0.18 / 100) * total).toFixed(2);
    } else if (total <= 1000000) {
      gstOnCurrencyConversion = (180 + (0.09 / 100) * (total - 100000)).toFixed(2);
    } else {
      gstOnCurrencyConversion = (990 + (0.018 / 100) * (total - 1000000)).toFixed(2);
    }
    let tcs = "";
    let tcsFlag = "";
    if (total <= 7000000) {
      // Tax system before 1st Oct 2023
      if (prepaidtravel.purposeName === "education (financed by loan)") {
        if (total < 700000) {
          tcs = "0";
        } else {
          tcsFlag = ((0.5 / 100) * total).toFixed(2);
        }
      } else if (prepaidtravel.purposeName === "education (other than financed by loan)") {
        if (total < 700000) {
          tcs = "0";
        } else {
          tcsFlag = ((5 / 100) * total).toFixed(2);
        }
      } else if (prepaidtravel.purposeName === "other purposes") {
        if (total < 700000) {
          tcs = "0";
        } else {
          tcsFlag = ((5 / 100) * total).toFixed(2);
        }
      } else if (prepaidtravel.purposeName === "overseas tour program package") {
        tcs = ((5 / 100) * total).toFixed(2);
      }
    }
    const TotalOfAllCharges = (parseFloat(data.RemittanceServiceCharge) + parseFloat(GstOnCharge) + parseFloat(gstOnCurrencyConversion) + (tcsFlag ? parseFloat(tcsFlag) : parseFloat(tcs))).toFixed(2)
    const updatedCurrencyConverter = await prepaidtravelModel.findByIdAndUpdate({ _id: prepaidtravel._id }, { $set: { data1: data.data1, data2: data.data2, exchangeRate: exchangeRate, transferAmountInFCY: prepaidtravel.forexAmount, RemittanceServiceCharge: data.RemittanceServiceCharge, GstOnCharge: GstOnCharge, GstOnCurrencyConversion: gstOnCurrencyConversion, TCS: tcs, TCS_flag: tcsFlag, TotalFundingAmtInINR: total, TotalOfAllChargesAndTaxes: TotalOfAllCharges, }, }, { new: true });
    return res.status(200).json({ status: 200, message: "prepaidtravel created successfully.", data: updatedCurrencyConverter, });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.deletePrepaidTravelById = async (req, res) => {
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
