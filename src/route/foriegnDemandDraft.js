const express = require("express");
const router = express.Router();
const orderController = require("../controller/foriegnDemandDraft");


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'pan', maxCount: 1 }, { name: 'doc', maxCount: 1 }]);

// Create a new order
router.post("/", orderController.createForiegnDraft);

// router.get("/", orderController.getAllOrder);

// // Get order by ID
// router.get("/:id", orderController.getOrderById);

// // Update an existing order
router.put("/:id", cpUpload,orderController.updateForiegnDraft);
router.put("/updateAcc/:id", orderController.updateForiegnAccountDetails);

// // Delete an order
// router.delete("/:id", orderController.deleteOrder);

module.exports = router;
