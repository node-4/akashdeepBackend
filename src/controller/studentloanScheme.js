const studentLoanModel = require('../model/studentloanScheme'); // Replace the path to the studentLoan model with your actual file path

// Example controller function to handle creating a new student loan
exports.createStudentLoan = async (req, res) => {
  try {
    // Extract data from the request body
    const { para1, para2, moreInformation } = req.body;

    // Create a new student loan document using the model
    const studentLoan = new studentLoanModel({ para1, para2, moreInformation });

    // Save the student loan document to the database
    const savedStudentLoan = await studentLoan.save();

    // Send a response with the saved student loan document
    return res.status(201).json(savedStudentLoan);
  } catch (error) {
    // If an error occurs, handle it in the catch block
    console.error(error);
    return res.status(500).json({ error: 'Failed to create student loan' });
  }
};
// Example controller function to handle retrieving all student loans
exports.getAllStudentLoans = async (req, res) => {
  try {
    // Retrieve all student loans from the database using the model
    const studentLoans = await studentLoanModel.find();

    // Send a response with the retrieved student loans
    return res.json(studentLoans);
  } catch (error) {
    // If an error occurs, handle it in the catch block
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve student loans' });
  }
};
exports.getStudentLoanById = async (req, res) => {
  try {
    // Extract the student loan ID from the request parameters
    const { id } = req.params;

    // Retrieve the student loan from the database by ID using the model
    const studentLoan = await studentLoanModel.findById(id);

    // If the student loan is not found, return an error response
    if (!studentLoan) {
      return res.status(404).json({ error: 'Student loan not found' });
    }

    // Send a response with the retrieved student loan
    return res.json(studentLoan);
  } catch (error) {
    // If an error occurs, handle it in the catch block
    console.error(error);
    return res.status(500).json({ error: 'Failed to get student loan' });
  }
};
// Example controller function to handle updating a student loan
exports.updateStudentLoan = async (req, res) => {
  try {
    // Extract the student loan ID and updated data from the request parameters and body
    const { id } = req.params;
    const { para1, para2, moreInformation } = req.body;

    // Update the student loan in the database by ID using the model
    const updatedStudentLoan = await studentLoanModel.findByIdAndUpdate(
      id,
      { para1, para2, moreInformation },
      { new: true } // Option to return the updated student loan after update
    );

    // If the student loan is not found, return an error response
    if (!updatedStudentLoan) {
      return res.status(404).json({ error: 'Student loan not found' });
    }

    // Send a response with the updated student loan
    return res.json(updatedStudentLoan);
  } catch (error) {
    // If an error occurs, handle it in the catch block
    console.error(error);
    return res.status(500).json({ error: 'Failed to update student loan' });
  }
};
// Example controller function to handle deleting a student loan
exports.deleteStudentLoan = async (req, res) => {
  try {
    // Extract the student loan ID from the request parameters
    const { id } = req.params;

    // Delete the student loan from the database by ID using the model
    const deletedStudentLoan = await studentLoanModel.findByIdAndDelete(id);

    // If the student loan is not found, return an error response
    if (!deletedStudentLoan) {
      return res.status(404).json({ error: 'Student loan not found' });
    }

    // Send a response with the deleted student loan
    return res.json(deletedStudentLoan);
  } catch (error) {
    // If an error occurs, handle it in the catch block
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete student loan' });
  }
};
