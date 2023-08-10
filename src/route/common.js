const express = require('express');
const router = express.Router();
const controller = require('../controller/common');

// Route for creating remitter, beneficiary, and order
router.post('/createRemitterBeneficiaryOrder', controller.createRemitterBeneficiaryOrder);
router.get('/getRemitterBeneficiaryOrder/:id', controller.getRemitterBeneficiaryOrder);
router.get('/getAllRemitterBeneficiaryOrder', controller.getAllRemitterBeneficiaryOrder);
router.put('/updateRemitterBeneficiaryOrder/:remitterId/:beneficiaryId/:orderId', controller.updateRemitterBeneficiaryOrder);

router.delete('/deleteRemitterBeneficiaryOrder/:remitterId/:beneficiaryId/:orderId', controller.deleteRemitterBeneficiaryOrder)

module.exports = router;
