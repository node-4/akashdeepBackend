const express = require("express");
const router = express.Router();
const beneficiaryController = require("../controller/beneficiary");


router.post("/", beneficiaryController.createBeneficiary);
// GET route to retrieve all beneficiaries
router.get("/:id", beneficiaryController.getBeneficiary);

// GET route to retrieve a specific beneficiary by ID
// router.get("/:id", beneficiaryController.getBeneficiaryById);

// UPDATE route to update a specific beneficiary by ID
// router.put("/:id", beneficiaryController.updateBeneficiary);

// // DELETE route to delete a specific beneficiary by ID
// router.delete("/:id", beneficiaryController.deleteBeneficiary);

module.exports = router;
