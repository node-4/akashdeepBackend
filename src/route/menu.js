const express = require("express");
const router = express.Router();
const menuController = require("../controller/menu");

router.get('/menus', menuController.getMenus);
router.post('/menus', menuController.createMenu);
router.get('/menus/:id', menuController.getMenuById);
router.put('/menus/:id', menuController.updateMenu);
router.delete('/menus/:id', menuController.deleteMenu);

module.exports = router;