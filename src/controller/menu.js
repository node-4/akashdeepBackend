const Menu = require('../model/menu');

module.exports = {
  getMenus: async function(req, res) {
    try {
      const menus = await Menu.find({});
      res.json(menus);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  createMenu: async function(req, res) {
    try {
      const newMenu = new Menu(req.body);
      const menu = await newMenu.save();
      res.json(menu);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getMenuById: async function(req, res) {
    try {
      const menu = await Menu.findById(req.params.id);
      if (!menu) {
        return res.status(404).send('Menu not found');
      }
      res.json(menu);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateMenu: async function(req, res) {
    try {
      const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (!menu) {
        return res.status(404).send('Menu not found');
      }
      res.json(menu);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteMenu: async function(req, res) {
    try {
      const menu = await Menu.findByIdAndRemove(req.params.id);
      if (!menu) {
        return res.status(404).send('Menu not found');
      }
      res.json({message: 'Menu deleted successfully'});
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
