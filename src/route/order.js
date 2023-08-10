const express = require("express");
const router = express.Router();
const menuController = require("../controller/order");

// router.get('/menus', menuController.getMenus);
router.post('/', menuController.createOrder);
router.post('/:id', menuController.processOrderByorderId);
router.put('/:id', menuController.updateorder);

router.get('/', menuController.getallorder)

router.get('/:id', menuController.getallorderById)

router.get('/user/:id', menuController.getallorderByremitter_id)

router.get('/userid/:user', menuController.getallorderbyuserid)
// router.delete('/menus/:id', menuController.deleteMenu);

module.exports = router;