const express = require("express");
const router = express.Router();
const prepaidtravelController = require("../../controller/prepaidtravelcard/prepaidtravelCard_unload");

const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
})
const upload = multer({storage: storage})
var cpUpload = upload.fields([{name: 'pan', maxCount: 1},{ name: 'passportFront', maxCount: 1 },{ name: 'passportBack', maxCount: 1 }])

router.post("/", prepaidtravelController.createPrepaidTravel_unload);
router.get("/", prepaidtravelController.findAllPrepaidcard_unload);
router.get("/:id", prepaidtravelController.getPrepaidTravelById_unload);
router.put('/:id', cpUpload,prepaidtravelController.updatePrepaidTravelById_unload);
router.put('/PrepaidAccount/:id', prepaidtravelController.updatePrepaidAccountDetails_unload);
router.delete("/:id", prepaidtravelController.deletePrepaidTravelById_unload);

module.exports = router
