const axios = require("axios");
// const addharcard = require("../model/addharverification");
const pann = require("../model/pancard");
exports.createpan = async (req, res) => {
  try {
    const { pan } = req.body;
    const newBeneficiary = new pann({ pan });
    // const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG";
    // const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84";
    const clientId = "CF370281CJOS20EHP6FSM6JOP5BG";
    const clientSecret = "a9ce558e305335fb8eaadbb4703b6a7f8f5fd622";
    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    }
    // const apiUrl = "https://api.cashfree.com/verification/pan";
    const apiUrl = 'https://sandbox.cashfree.com/verification/pan';
    axios.post(apiUrl, newBeneficiary, { headers })
      .then(async (response) => {
        console.log("-----------------------", response.data);
        const createdBeneficiary = response.data;
        newBeneficiary.ref_id = response.data.ref_id;
        newBeneficiary.save();
        return res.status(201).json(createdBeneficiary);
      }).catch((error) => {
        return res.status(501).send({ msg: "error", data: error.response.data, });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error: error });
  }
};

// exports.verifyotp = async (req, res) => {
//   try {
//     const {
//       otp,
//       ref_id
//     } = req.body
//     const newBeneficiary = new addharcard({
//       otp,
//       ref_id
//     })
//     const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG"
//     const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84"
//     const headers = {
//       "x-api-version": "2023-03-01",
//       "Content-Type": "application/json",
//       "X-Client-ID": clientId,
//       "X-Client-Secret": clientSecret,
//     };
//    console.log(headers);
//     const response = await axios.post(
//       "https://api.cashfree.com/verification/offline-aadhaar/verify",
//       newBeneficiary,
//       {
//         headers: headers,
//       }
//     );
//    // console.log(response);
//     const createdBeneficiary = response.data;
//     console.log(createdBeneficiary)
//     newBeneficiary.save()
//     res.status(201).json(createdBeneficiary);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
