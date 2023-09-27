const web = require("../model/webhooks");
const axios = require("axios");

exports.convertCurrencyccc = async (req, res) => {
  const {
    /*fromCurrency, toCurrency, amount*/ payment_url,
    refund_url,
    order_url,
  } = req.body;
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
    res.status(500).json({ error: error.message });
  }
};

exports.createwebhooks = async (req, res) => {
  try {
    const { payment_url, refund_url, order_url } = req.body;

    const newBeneficiary = new web({
      payment_url, refund_url, order_url
    });

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
      "https://sandbox.cashfree.com/pg/lrs/webhooks",
      newBeneficiary,
      {
        headers: headers,
      }
    );

    // console.log(response);
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);

    res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
