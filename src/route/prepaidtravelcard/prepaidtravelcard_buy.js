const express = require("express");
const router = express.Router();
const prepaidtravelController = require("../../controller/prepaidtravelcard/prepaidtravelcard_buy");

const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
})
const upload = multer({storage: storage})
var cpUpload = upload.fields([{name: 'pan', maxCount: 1},{ name: 'passportFront', maxCount: 1 },{ name: 'passportBack', maxCount: 1 },{ name: 'air', maxCount: 1 },{ name: 'Visa', maxCount: 1 }])

router.post("/", prepaidtravelController.createPrepaidTravel);
router.get("/", prepaidtravelController.findAllPrepaidcard);
router.get("/:id", prepaidtravelController.getPrepaidTravelById);
router.put('/updatePan/:id', cpUpload,prepaidtravelController.updatePrepaidTravelById);
router.put('/PrepaidAccount/:id', prepaidtravelController.updatePrepaidAccountDetails);
router.delete("/:id", prepaidtravelController.deletePrepaidTravelById);

module.exports = router;
