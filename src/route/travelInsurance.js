const express = require('express');
const router = express.Router();
const travelInsuranceController = require('../controller/travelInsurance'); 

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
});
const upload = multer({ storage: storage });

router.post('/', travelInsuranceController.createTravelInsurance);

router.get('/', travelInsuranceController.getAllTravelInsurances);

router.get('/:id', travelInsuranceController.getAllTravelInsurancesById);

router.put('/pan/:id', upload.array('image'), travelInsuranceController.updateTravelInsuranceByIdPan);

router.put('/passport/:id', upload.array('image'), travelInsuranceController.updateTravelInsuranceByIdPassport);

router.put('/ticket/:id', upload.array('image'), travelInsuranceController.updateTravelInsuranceByIdTicket);

router.put('/visa/:id', upload.array('image'), travelInsuranceController.updateTravelInsuranceByIdVisa);

router.delete('/:id', travelInsuranceController.deleteTravelInsuranceById);

module.exports = router;
