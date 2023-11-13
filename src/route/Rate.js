const express = require("express");
const router = express.Router();
const menuController = require("../controller/Rate");

router.get('/', menuController.getRates);
router.post('/', menuController.createRate);
router.get('/:id', menuController.getRateById);
router.put('/:id', menuController.updateRate);
router.delete('/:id', menuController.deleteRate);
module.exports = router;