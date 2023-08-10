const foriegnDemand = require("../model/foriegnDemandDraft");
const ForeignCurrency = require("../model/foriegncurrency");
const axios = require("axios");
var newOTP = require("otp-generators");
const currencyModel = require("../model/bookthisorder/addcurrency");
const cityModel = require("../model/bookthisorder/selectcity");

exports.createForiegnDraft = async (req, res) => {
  try {
    data = {
      selectCity: req.body.selectCity,
      currencyYouHave: req.body.currencyYouHave,
      currencyYouWant: req.body.currencyYouWant,
      demandDraft: req.body.demandDraft,
      Amount: req.body.Amount,
      // convertedAmt:req.body.convertedAmt,
      // phone: req.body.phone,
      email: req.body.email,
      // name: req.body.name,
      mobile: req.body.mobile,
    };
    req.body.otp = newOTP.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });

    const cityData = await cityModel.findById({
      _id: data.selectCity,
    });
    console.log(cityData.selectcity);

    const currenciesHave = await currencyModel.findById({
      _id: data.currencyYouHave,
    });
    console.log(currenciesHave.addcurrency);

    const currenciesWant = await currencyModel.findById({
      _id: data.currencyYouWant,
    });
    console.log(currenciesWant.addcurrency);
    // res.status(200).json(currencies);
    // Make a request to an external currency conversion API
    const response = await axios.get(
      `https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${currenciesWant.addcurrency}&to=INR&amount=${data.Amount}`
    );

    console.log(response.data.value);
    const convertedAmt1 = response.data.value;
    const total = response.data.value;

    let obj = {
      selectCity: data.selectCity,
      city: cityData.selectcity,
      currencyYouHave: data.currencyYouHave,
      currencyHave: currenciesHave.addcurrency,
      currencyYouWant: data.currencyYouWant,
      currencyWant: currenciesWant.addcurrency,
      demandDraft: data.demandDraft,
      Amount: data.Amount,
      convertedAmt: convertedAmt1,
      total: total,
      // phone: data.phone,
      otp: req.body.otp,
      email: data.email,
      // name: data.name,
      mobile: data.mobile,
    };

    const foriegnData = new foriegnDemand(obj);
    const result = await foriegnData.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const order = await foriegnDemand.find();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ msg: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example controller function
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await foriegnDemand.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ msg: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example controller function
exports.updateForiegnDraft = async (req, res) => {
  try {
    console.log("hi");
    let panCard = req.files["pan"];
    req.body.pan = panCard[0].path;
    let docu = req.files["doc"];
    req.body.docu1 = docu[0].path;

    const currency = await foriegnDemand.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          applicant_remitter: req.body.applicant_remitter,
          panCard: req.body.panCard,
          uploadPanCard: req.body.pan,
          supportingDoc: req.body.supportingDoc,
          uploadSupportingDoc: req.body.docu1,
        },
      },
      { new: true }
    );
    if (!currency) {
      res.status(404).json({ message: "foriegn demandDraft not found" });
    } else {
      res
        .status(200)
        .send({
          status: 200,
          message: "updated successfully ",
          data: currency,
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateForiegnAccountDetails = async (req, res) => {
  try {
    console.log("hi");
    let orderId = await reffralCode();
    let customer =await reffralCode();
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

    const currency = await foriegnDemand.findByIdAndUpdate(
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
      res.status(404).json({ message: "Currency not found" });
    } else {
      res.status(200).json(currency);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Example controller function
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await foriegnDemand.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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