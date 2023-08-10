const express = require('express');
const router = express.Router();
const currencyController = require('../controller/foriegncurrency');

const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
})
const upload = multer({storage: storage})
var cpUpload = upload.fields([{name: 'pan', maxCount: 1},{ name: 'passportt', maxCount: 1 }])

router.post('/convert', currencyController.convertCurrency);


router.post('/', currencyController.create);


router.get('/', currencyController.findAll);


router.get('/:id', currencyController.findOne);


router.put('/:id', cpUpload,currencyController.update);

router.put('/updateAccountDetails/:id', currencyController.updateAccountDetails);


router.delete('/:id', currencyController.delete);

module.exports = router

