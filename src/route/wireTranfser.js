const express = require('express');
const router = express.Router();
const wireTransferController = require('../controller/wireTranfser'); 

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
});
const upload = multer({ storage: storage });

router.post('/', wireTransferController.wireTransfer)

// router.get('/', wireTransferController.getAllTravelInsurances);

// router.get('/:id', wireTransferController.getAllTravelInsurancesById);

router.put('/pan/:id', wireTransferController.updatepan);

router.put("/addharotp/:id", wireTransferController.addharotpWire);

router.put("/verifyotp/:id", wireTransferController.verifyotpWire)

router.put('/updateRemitter/:id',  wireTransferController.updateRemitter);

router.put('/updateBeneficiary/:id', wireTransferController.updateBeneficiary)

router.put('/updatebifurcation/:id',  wireTransferController.updatebifurcation);

router.put('/updateDocument/:id',  wireTransferController.updateDocument);

// router.delete('/:id', wireTransferController.deleteTravelInsuranceById);

module.exports = router
