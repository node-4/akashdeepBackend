const ForeignCurrency = require("../model/foriegncurrency");
const axios = require("axios");
var newOTP = require("otp-generators");
const currencyModel = require("../model/bookthisorder/addcurrency");
const cityModel = require("../model/bookthisorder/selectcity");
const Rate = require("../model/rate");

exports.create = async (req, res) => {
  try {
    data = {
      selectCity: req.body.selectCity,
      currencyYouHave: req.body.currencyYouHave,
      currencyYouWant: req.body.currencyYouWant,
      forexcard: req.body.forexcard,
      forexAmount: req.body.forexAmount,
      phone: req.body.phone,
      email: req.body.email,
      name: req.body.name,
      mobile: req.body.mobile,
    };
    req.body.otp = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false, });
    const cityData = await cityModel.findById({ _id: data.selectCity, });
    console.log(cityData.selectcity);
    const currenciesHave = await currencyModel.findById({ _id: data.currencyYouHave, });
    console.log(currenciesHave.addcurrency);
    const currenciesWant = await currencyModel.findById({ _id: data.currencyYouWant, });
    console.log(currenciesWant.addcurrency);
    const rates = await Rate.findOne({ to_currency: 'INR', from_currency: currenciesWant.addcurrency, });
    if (!rates) {
      return res.status(404).json({ message: "Rate not found" });
    }
    // const response = await axios.get(
    //   `https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${currenciesWant.addcurrency}&to=INR&amount=${data.forexAmount}`
    // );
    const ConvertedAmount = rates.amount * Number(req.body.forexAmount);
    const total = rates.amount * Number(req.body.forexAmount);
    let obj = {
      selectCity: data.selectCity,
      city: cityData.selectcity,
      currencyYouHave: data.currencyYouHave,
      currencyHave: currenciesHave.addcurrency,
      currencyYouWant: data.currencyYouWant,
      currencyWant: currenciesWant.addcurrency,
      forexcard: data.forexcard,
      forexAmount: data.forexAmount,
      ConvertedAmount: ConvertedAmount,
      total: total,
      phone: data.phone,
      otp: req.body.otp,
      email: data.email,
      name: data.name,
      mobile: data.mobile,
    };
    const currency = new ForeignCurrency(obj);
    const result = await currency.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
exports.findAll = async (req, res) => {
  try {
    const currencies = await ForeignCurrency.find();
    return res.status(200).json({
      status: 200,
      message: "Order created successfully.",
      data: currencies,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.findOne = async (req, res) => {
  try {
    const currency = await ForeignCurrency.findById(req.params.id);
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Order created successfully.",
        data: currency,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.update = async (req, res) => {
  try {
    console.log("hi");
    let panCard = req.files["pan"]
    req.body.pan = panCard[0].path
    let pass = req.files["passportt"]
    req.body.passport1 = pass[0].path
    const pan = req.body.panCard
    let ticket = req.files["ticket"]
    req.body.ticket = ticket[0].path
    let visa = req.files["visa"]
    req.body.visa = visa[0].path
    const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG";
    const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84";
    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
      "x-cf-signature": 'pFT1fxWStUgM6DDw5iGnrm3JoQ5g5CaiKDCNQZFJ08jtHaSRvtuEMm41831KRFUqx+rwGSDfGVVEbMla1uknA9IXeJPDtJAR4Ja0NBMQDkP7Wr7ei/Cfc3lJn9BItHNKGovdmSl61+7ReNd7WPNPa4bpni8V/QX43VCtDX2BtNIuhZ5zDgIQlUqikyljH3r2slP1zYwr2UbugYjkX4ivqqX3Kj7ErffFqDR02LOQNp2gJlUq3dGI5L2qb+S83S5ZXgQpgZOQ1JKYcSTQs2frYlJiT71k4ThrpfhfUyg1QFn+XGyxqwIdhbqd1v6jRxmkkQGU+MxP/6RID2MCYJqeug==',
    }
    const response = await axios.post(
      "https://api.cashfree.com/verification/pan",
      newBeneficiary,
      {
        headers: headers,
      }
    );



    // const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG";
    // const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84";
    // console.log(req.body);
    // const clientId = "CF370281CJOS20EHP6FSM6JOP5BG";
    // const clientSecret = "a9ce558e305335fb8eaadbb4703b6a7f8f5fd622";

    // const headers = {
    //   "x-api-version": "2023-03-01",
    //   "Content-Type": "application/json",
    //   "X-Client-ID": clientId,
    //   "X-Client-Secret": clientSecret,
    // };

    // const response = await axios.post(
    //   // "https://api.cashfree.com/verification/pan",
    //   "https://sandbox.cashfree.com/verification/pan",
    //   { pan },
    //   {
    //     headers: headers,
    //   }
    // );
    console.log(response);
    const createdBeneficiary = response.data;
    const updatedCurrencyConverter = await ForeignCurrency.findByIdAndUpdate({ _id: req.params.id }, { $set: { panCard: pan, panStatus: response.data.pan_status, uploadPanCard: req.body.pan, passport: req.body.passport, uploadPassport: req.body.passport1, visa: req.body.visa, ticket: req.body.ticket, }, }, { new: true });
    return res.status(201).json(updatedCurrencyConverter);


  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
exports.updateAccountDetails = async (req, res) => {
  try {
    console.log("hi");
    let orderId = await reffralCode();
    let customer = await reffralCode();
    const data = {
      beneficiaryName: req.body.beneficiaryName,
      transactionAmount: req.body.transactionAmount,
      AmountInWords: req.body.AmountInWords,
      beneficiaryAccountNumber: req.body.beneficiaryAccountNumber,
      ifscCode: req.body.ifscCode,
      bankNameAndAddress: req.body.bankNameAndAddress,
      referenceNo_OrderID: orderId,
      challenCreatedOn: req.body.challenCreatedOn,
      CA_Number: req.body.CA_Number,
      emailAddress: req.body.emailAddress,
      customerID: customer,
      mobile: req.body.mobile,
    };

    const currency = await ForeignCurrency.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          beneficiaryName: data.beneficiaryName,
          transactionAmount: data.transactionAmount,
          AmountInWords: data.AmountInWords,
          beneficiaryAccountNumber: data.beneficiaryAccountNumber,
          ifscCode: data.ifscCode,
          bankNameAndAddress: data.bankNameAndAddress,
          referenceNo_OrderID: data.referenceNo_OrderID,
          challenCreatedOn: data.challenCreatedOn,
          CA_Number: data.CA_Number,
          emailAddress: data.emailAddress,
          customerID: data.customerID,
          mobile: data.mobile,
        },
      },
      { new: true }
    );
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    } else {
      return res.status(200).json(currency);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
exports.delete = async (req, res) => {
  try {
    const currency = await ForeignCurrency.findByIdAndDelete(
      req.params.currencyId
    );
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    } else {
      return res.status(200).json({ message: "Currency deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.convertCurrency = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      /* 'https://v6.exchangerate-api.com/v6/12d331a841b6fcb37fc60cc5/latest/${fromCurrency}'*/
    );
    const exchangeRates = response.data.rates;
    const rate = exchangeRates[toCurrency];
    const convertedAmount = amount * rate;

    return res.status(200).json({
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      convertedAmount: convertedAmount,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const reffralCode = async () => {
  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let OTP = "";
  for (let i = 0; i < 9; i++) {
    OTP += digits[Math.floor(Math.random() * 36)];
  }
  return OTP;
}

