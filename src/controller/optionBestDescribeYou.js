const OptionBestDescribeModel = require('../model/optionBestDescribeYou'); // Replace the path to the optionBestDescribe model with your actual file path

// Controller function to create a new optionBestDescribe
exports.createOptionBestDescribe = async (req, res) => {
  try {
    // Extract data from request body
    const { optionBestDescribe } = req.body;

    // Create a new document using the model
    const newOptionBestDescribe = new OptionBestDescribeModel({
      optionBestDescribe
    });

    // Save the document to the database
    const createdOptionBestDescribe = await newOptionBestDescribe.save();

    // Send success response
    res.status(201).json(createdOptionBestDescribe);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all optionBestDescribe
exports.getAllOptionBestDescribe = async (req, res) => {
  try {
    // Find all documents in the collection
    const allOptionBestDescribe = await OptionBestDescribeModel.find();

    // Send success response
    res.status(200).json(allOptionBestDescribe);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get optionBestDescribe by ID
exports.getOptionBestDescribeById = async (req, res) => {
  try {
    // Extract ID from request parameters
    const { id } = req.params;

    // Find document by ID in the collection
    const optionBestDescribe = await OptionBestDescribeModel.findById(id);

    // If document not found, send not found response
    if (!optionBestDescribe) {
      return res.status(404).json({ error: 'OptionBestDescribe not found' });
    }

    // Send success response
    res.status(200).json(optionBestDescribe);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update optionBestDescribe by ID
exports.updateOptionBestDescribeById = async (req, res) => {
  try {
    // Extract ID and updated data from request body
    const { id } = req.params;
    const { optionBestDescribe } = req.body;

    // Find document by ID in the collection and update it
    const updatedOptionBestDescribe = await OptionBestDescribeModel.findByIdAndUpdate(
      id,
      { optionBestDescribe },
      { new: true }
    );

    // If document not found, send not found response
    if (!updatedOptionBestDescribe) {
      return res.status(404).json({ error: 'OptionBestDescribe not found' });
    }

    // Send success response
    res.status(200).json(updatedOptionBestDescribe);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteOptionBestDescribeById = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the request parameters
    const result = await optionBestDescribeModel.deleteOne({ _id: id }); // Use the model's deleteOne method to delete the document by ID
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'optionBestDescribe deleted successfully' });
    } else {
      res.status(404).json({ message: 'optionBestDescribe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
