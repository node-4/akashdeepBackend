const Remittance = require('../model/remittance'); // Replace the path to the remittance model with your actual file path
const axios = require("axios")




// exports.createRemittance = async (req, res) => {
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

//     const newBeneficiary = new Remittance({
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

  
    
//         const clientId = "TEST370281a1d99b47aa3a41930df0182073"
//         const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448"
    
//         const headers = {
//           "x-api-version":"2023-03-01",
//           "Content-Type": "application/json",
//           "X-Client-ID": clientId,
//           "X-Client-Secret": clientSecret,
//         };
    
    
//         console.log(headers)
//     const response = await axios.post("https://sandbox.cashfree.com/pg/lrs/remitters", newBeneficiary,{
//       headers: headers 
//     });

    
//     console.log(response)
//     // Extract the created beneficiary from the response
//     const createdBeneficiary = response.data;

//     res.status(201).json(createdBeneficiary);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: "Internal server error" });
//   }
// };







// Create a new remittance
exports.createRemittance = async (req, res) => {
  try {
    // Get data from request body
    const { city, optionBestDescribeYou, name, mobile, email, monthlyImport_Export, purpose } = req.body;

    // Create a new remittance document
    const remittance = new Remittance({
      city,
      optionBestDescribeYou,
      name,
      mobile,
      email,
      monthlyImport_Export,
      purpose
    });

    // Save the remittance document to the database
    const result = await remittance.save();
    res.status(201).json({ message: 'Remittance created successfully', data: result });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Get all remittances
exports.getAllRemittances = async (req, res) => {
  try {
    // Fetch all remittance documents from the database
    const remittances = await Remittance.find();
    res.status(200).json({ data: remittances });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a remittance by ID
exports.updateRemittanceById = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the request parameters
    const updateData = req.body; // Get the update data from the request body

    // Use the model's findByIdAndUpdate method to update the document by ID
    const result = await Remittance.findByIdAndUpdate(id, updateData, { new: true });

    if (result) {
      res.status(200).json({ message: 'Remittance updated successfully', data: result });
    } else {
      res.status(404).json({ message: 'Remittance not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a remittance by ID
exports.deleteRemittanceById = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the request parameters

    // Use the model's findByIdAndDelete method to delete the document by ID
    const result = await Remittance.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: 'Remittance deleted successfully' });
    } else {
      res.status(404).json({ message: 'Remittance not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Internal server error' });
  }
};
