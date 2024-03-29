const express = require("express");
const router = express.Router();
const prepaidtravelController = require("../../controller/prepaidtravelcard/prepaidtravelCard_reload");

const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
})
const upload = multer({storage: storage})
var cpUpload = upload.fields([{name: 'pan', maxCount: 1},{ name: 'passportFront', maxCount: 1 },{ name: 'passportBack', maxCount: 1 },{ name: 'air', maxCount: 1 },{ name: 'Visa', maxCount: 1 }])

router.post("/", prepaidtravelController.createPrepaidTravel_reload);
router.get("/", prepaidtravelController.findAllPrepaidcard_reload);
router.get("/:id", prepaidtravelController.getPrepaidTravelById_reload);
router.put('/:id', prepaidtravelController.updatePrepaidTravelById_reload);
router.put('/PrepaidAccount/:id', prepaidtravelController.updatePrepaidAccountDetails_reload);
router.delete("/:id", prepaidtravelController.deletePrepaidTravelById_reload);
router.post('/uploadImage', upload.single('image'),prepaidtravelController.uploadImage);

module.exports = router;
