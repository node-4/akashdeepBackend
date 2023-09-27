const Beneficiary = require("../model/beneficiary");
const axios = require("axios");

exports.convertCurrencyccc = async (req, res) => {
  const { /*fromCurrency, toCurrency, amount*/
    payment_url,
    refund_url,
    order_url } = req.body
  console.log("hi");
  try {
    const response = await axios.get(
      //`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
      /* 'https://v6.exchangerate-api.com/v6/12d331a841b6fcb37fc60cc5/latest/${fromCurrency}'*/
      `https://api.cashfree.com/lrs/webhooks/${payment_url, refund_url, order_url}`
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



exports.createBeneficiary = async (req, res) => {
  try {
    const {
      beneficiary_id,
      account_holder_name,
      account_number,
      swift_code,
      iban,
      routing_number,
      bank_name,
      bank_country,
      bank_address,
      sort_code,
      transit_code,
      bsb_number,
      address,
      city,
      state,
      country,
      postal_code
    } = req.body;

    const newBeneficiary = new Beneficiary({
      beneficiary_id,
      account_holder_name,
      account_number,
      swift_code,
      iban,
      routing_number,
      bank_name,
      bank_country,
      bank_address,
      sort_code,
      transit_code,
      bsb_number,
      address,
      city,
      state,
      country,
      postal_code
    });


    const clientId = "TEST370281a1d99b47aa3a41930df0182073";
    const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };


    console.log(headers)
    const response = await axios.post("https://sandbox.cashfree.com/pg/lrs/beneficiaries", newBeneficiary, {
      headers: headers
    });

    console.log(response)
    // Extract the created beneficiary from the response
    const createdBeneficiary = response.data;

    newBeneficiary.save()
    res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getBeneficiary = async (req, res) => {
  try {
    const beneficiaryId = req.params.id;

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

    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/lrs/beneficiaries/${beneficiaryId}`,
      { headers }
    );

    const beneficiary = response.data;

    res.status(200).json(beneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// exports.getBeneficiaries = async (req, res) => {
//   try {


//     const clientId = "TEST370281a1d99b47aa3a41930df0182073";
//     const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

//     const headers = {
//       "x-api-version":"2023-03-01",
//       "Content-Type": "application/json",
//       "X-Client-ID": clientId,
//       "X-Client-Secret": clientSecret,
//     };

// console.log(headers)
//     const response = await axios.get("https://sandbox.cashfree.com/pg/lrs/beneficiaries",{
//       headers: headers 
//     })
//     console.log(response)
//     // Extract the beneficiaries from the response
//     const beneficiaries = response.data;

//     res.status(200).json(beneficiaries);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getBeneficiaryById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const response = await axios.get(`https://api.example.com/beneficiaries/${id}`);

//     // Extract the beneficiary from the response
//     const beneficiary = response.data;

//     res.status(200).json(beneficiary);
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       return res.status(404).json({ error: "Beneficiary not found" });
//     }

//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.updateBeneficiary = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedFields = req.body;

//     const response = await axios.put(`https://api.example.com/beneficiaries/${id}`, updatedFields);

//     // Extract the updated beneficiary from the response
//     const updatedBeneficiary = response.data;

//     res.status(200).json(updatedBeneficiary);
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       return res.status(404).json({ error: "Beneficiary not found" });
//     }

//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.deleteBeneficiary = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const response = await axios.delete(`https://api.example.com/beneficiaries/${id}`);

//     // Extract the deleted beneficiary from the response
//     const deletedBeneficiary = response.data;

//     res.status(200).json(deletedBeneficiary);
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       return res.status(404).json({ error: "Beneficiary not found" });
//     }

//     res.status(500).json({ error: "Internal server error" });
//   }
// };





// exports.createBeneficiary = async (req, res) => {
//   try {
//     const {
//       beneficiary_id,
//       account_holder_name,
//       account_number,
//       swift_code,
//       iban,
//       routing_number,
//       bank_name,
//       bank_country,
//       bank_address,
//       sort_code,
//       transit_code,
//       bsb_number,
//       address,
//       city,
//       state,
//       country,
//       postal_code
//     } = req.body;

//     // Create a new beneficiary document using the Beneficiary model
//     const newBeneficiary = new Beneficiary({
//       beneficiary_id,
//       account_holder_name,
//       account_number,
//       swift_code,
//       iban,
//       routing_number,
//       bank_name,
//       bank_country,
//       bank_address,
//       sort_code,
//       transit_code,
//       bsb_number,
//       address,
//       city,
//       state,
//       country,
//       postal_code
//     });

//     // Save the new beneficiary document to the database
//     const savedBeneficiary = await newBeneficiary.save();

//     res.status(201).json(savedBeneficiary);
//   } catch (error) {
//     // Handle any errors that occurred during the creation process
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// exports.getBeneficiaries = async (req, res) => {
//   try {
//     // Retrieve all beneficiary documents from the database
//     const beneficiaries = await Beneficiary.find();

//     res.status(200).json(beneficiaries);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getBeneficiaryById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Retrieve a single beneficiary document by its ID from the database
//     const beneficiary = await Beneficiary.findById(id);

//     if (!beneficiary) {
//       return res.status(404).json({ error: "Beneficiary not found" });
//     }

//     res.status(200).json(beneficiary);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.updateBeneficiary = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedFields = req.body;

//     // Find the beneficiary document by ID and update its contents
//     const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(
//       id,
//       updatedFields,
//       { new: true }
//     );

//     if (!updatedBeneficiary) {
//       return res.status(404).json({ error: "Beneficiary not found" });
//     }

//     res.status(200).json(updatedBeneficiary);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.deleteBeneficiary = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the beneficiary document by ID and remove it from the database
//     const deletedBeneficiary = await Beneficiary.findByIdAndRemove(id);

//     if (!deletedBeneficiary) {
//       return res.status(404).json({ error: "Beneficiary not found" });
//     }

//     res.status(200).json(deletedBeneficiary);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
