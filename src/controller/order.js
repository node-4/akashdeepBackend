const orderr = require("../model/order");
const axios = require("axios");
const remitt = require("../model/remiiter1");
const userModel = require("../model/remitter");

exports.convertCurrencyccc = async (req, res) => {
  const { payment_url, refund_url, order_url,/*fromCurrency, toCurrency, amount*/ } = req.body;
  console.log("hi");
  try {
    const response = await axios.get(
      //`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
      /* 'https://v6.exchangerate-api.com/v6/12d331a841b6fcb37fc60cc5/latest/${fromCurrency}'*/
      `https://api.cashfree.com/lrs/webhooks/${(payment_url, refund_url, order_url)
      }`
    );
    console.log(response.payment_url);
    //   const exchangeRates = response.data.rates;
    //   const rate = exchangeRates[toCurrency];
    //   const convertedAmount = amount * rate;

    //   res.status(200).json({
    //     from: fromCurrency,
    //     to: toCurrency,
    //     amount: amount,
    //     convertedAmount: convertedAmount
    //   });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.createOrder = async (req, res) => {
  try {
    const {
      order_id,
      to_currency,
      to_amount,
      purpose,
      return_url,
      remitter_id,
      beneficiary_id,
      customer_details: [
        {
          pan,
          name,
          address,
          phone_number,
          email,
          nationality,
          dob,
          aadhar_number,
          passport_details: {
            passport_number,
            place_of_issue,
            issue_date,
            expiry_date,
          },
        },
      ],
      customer_relationship,
      remarks,
      customer_declaration,
      status,
      userid
    } = req.body;

    const purposes = await remitt.findOne({ remitter_id: remitter_id });


    const newBeneficiary = new orderr({
      order_id,
      to_currency,
      to_amount,
      purpose,
      return_url,
      remitter_id,
      beneficiary_id,
      customer_details: [
        {
          pan,
          name,
          address,
          phone_number,
          email,
          nationality,
          dob,
          aadhar_number,
          passport_details: {
            passport_number,
            place_of_issue,
            issue_date,
            expiry_date,
          },
        },
      ],
      customer_relationship,
      remarks,
      customer_declaration,
      status,
      remitterid: purposes._id,
      userid
    });

    newBeneficiary.save()

    // const clientId = "TEST370281a1d99b47aa3a41930df0182073";
    // const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

    const clientId = "CF370281CJOS20EHP6FSM6JOP5BG";
    const clientSecret = "a9ce558e305335fb8eaadbb4703b6a7f8f5fd622";


    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };

    console.log(headers);
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/orders",
      newBeneficiary,
      {
        headers: headers,
      }
    );

    console.log(response);
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);

    return res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.processOrderByorderId = async (req, res) => {
  try {
    const orderID = req.params.id;

    // const clientId = "TEST370281a1d99b47aa3a41930df0182073";
    // const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";
    const clientId = "CF370281CJOS20EHP6FSM6JOP5BG";
    const clientSecret = "a9ce558e305335fb8eaadbb4703b6a7f8f5fd622";

    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };

    console.log(headers);
    const response = await axios.post(
      `https://sandbox.cashfree.com/pg/lrs/orders/${orderID}/process`,
      // "https://sandbox.cashfree.com/pg/lrs/orders",
      // newBeneficiary,
      {
        headers: headers,
      }
    );

    //console.log(response);
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);

    return res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateorder = async (req, res) => {

  try {
    const menu = await orderr.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    if (!menu) {
      return res.status(404).send('Menu not found');
    }
    return res.json(menu);
  } catch (err) {
    return res.status(500).send(err);
  }
}
exports.getallorder = async (req, res) => {
  try {
    const menu = await orderr.find();
    if (!menu) {
      return res.status(404).send('Menu not found');
    }
    return res.json({ msg: menu });
  } catch (err) {
    return res.status(500).send(err);
  }
}
exports.getallorderById = async (req, res) => {
  try {
    const menu = await orderr.findOne({ order_id: req.params.id });
    if (!menu) {
      return res.status(404).send('Menu not found');
    }
    return res.json({ msg: menu });
  } catch (err) {
    return res.status(500).send(err);
  }
}
exports.getallorderByremitter_id = async (req, res) => {
  try {
    const menu = await orderr.find({ remitter_id: req.params.id });
    if (!menu) {
      return res.status(404).send('Menu not found');
    }
    return res.json({ msg: menu });
  } catch (err) {
    return res.status(500).send(err);
  }
}
exports.getallorderbyuserid = async (req, res) => {
  try {
    const menu = await orderr.find({ userid: req.params.user }).populate("userid remitterid")
    if (!menu) {
      return res.status(404).send('order not found');
    }
    return res.json({ msg: menu });
  } catch (err) {
    return res.status(500).send(err);
  }
}