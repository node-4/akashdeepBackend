const axios = require("axios")
const addharcard = require("../model/addharverification");

const matchAadhar = async (frontImage, backImage) => {
  // Implement your matching logic or call an external API to perform the comparison
  // For simplicity, let's assume we're making an API call to a matching service
  const response = await axios.post("https://your-matching-service.com/match", {
    frontImage,
    backImage,
  });

  return response.data.matched; // Assuming the response contains a 'matched' field indicating the result
}

exports.matchAadharCard = async (req, res) => {
  try {
    const { frontImage, backImage, driverId } = req.body;

    // Call the matchAadhar function to perform the comparison
    const matched = await matchAadhar(frontImage, backImage);

    // Create a new AadharMatch document with the result
    const aadharMatch = new AadharMatch({
      driverId,
      frontImage,
      backImage,
      matched,
    });

    // Save the AadharMatch document to the database
    const savedAadharMatch = await aadharMatch.save();

    res.status(200).json(savedAadharMatch);
  } catch (error) {
    console.error("Error matching Aadhar card:", error);
    res
      .status(500)
      .json({ error: "An error occurred while matching the Aadhar card" });
  }
}

exports.addharotp = async (req, res) => {
  try {
    const {
        aadhaar_number
    } = req.body
   
    const newBeneficiary = new addharcard({
        aadhaar_number
    })
    const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG"
    const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84"
    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };
    console.log(headers);
    const response = await axios.post(
      "https://api.cashfree.com/verification/offline-aadhaar/otp",
      newBeneficiary,
      {
        headers: headers,
      }
    );
    console.log(response)
    const createdBeneficiary = response.data
    // console.log(createdBeneficiary)
    newBeneficiary.ref_id = response.data.ref_id
    newBeneficiary.save()
    res.status(201).json(createdBeneficiary)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.verifyotp = async (req, res) => {
  try {
    const {
      otp,
      ref_id
    } = req.body
    const newBeneficiary = new addharcard({
      otp,
      ref_id
    })
    const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG"
    const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84"
    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };
   console.log(headers);
    const response = await axios.post(
      "https://api.cashfree.com/verification/offline-aadhaar/verify",
      newBeneficiary,
      {
        headers: headers,
      }
    );
   // console.log(response);
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary)
    newBeneficiary.save()
    res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}