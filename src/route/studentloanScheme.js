const express = require('express');
const router = express.Router();
const studentLoanController = require('../controller/studentloanScheme'); // Replace the path to the studentLoan controller with your actual file path

router.post('/', studentLoanController.createStudentLoan);


router.get('/', studentLoanController.getAllStudentLoans);

// Route handler to get a student loan by ID
router.get('/:id', studentLoanController.getStudentLoanById);

// Route handler to update a student loan
router.put('/:id', studentLoanController.updateStudentLoan);

// Route handler to delete a student loan
router.delete('/:id', studentLoanController.deleteStudentLoan);

module.exports = router;
