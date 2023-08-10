const Menu = require("../model/submenu");

exports.createMenuAndSubMenu1 = async (req, res) => {
    try {
      const menuData = await Menu.create({
        menu: req.body.menu,subMenu:req.body.subMenu, image:req.body.image
      });
      return res.status(200).send({ msg: menuData });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        message: "internal server error",
      });
    }
  };



exports.getAllMenu1 = async (req, res) => {
  try {
    const menuData = await Menu.find().populate('subMenu')
    if (!menuData || menuData.length === 0) {
      return res.status(400).json({
        message: "No menuData",
      });
    }
    return res.status(200).json({
      message: "menuData found",
      data: menuData,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};


exports.getMenuById1 = async (req, res) => {
    try {
      const menuData = await Menu.findById({_id:req.params.id}).populate('subMenu');
      if (!menuData || menuData.length === 0) {
        return res.status(400).json({
          message: "No menuData",
        });
      }
      return res.status(200).json({
        message: "menuData found",
        data: menuData,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        message: "internal server error",
      });
    }
  };



exports.updateMenu1 = async (req, res) => {
  try {
    const menuData = await Menu.findOneAndUpdate(
      { _id: req.params.id },
      {menu: req.body.menu,subMenu:req.body.subMenu,image:req.body.image},
      { new: true }
    );
    if (!menuData) {
      return res.status(400).json({
        message: "menuData not found",
      });
    }
    return res.status(200).json({
      message: "menuData updated",
      data: menuData,
    });
  } catch (err) {
    console.log(err.message);
  return  res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.deleteMenu1 = async (req, res) => {
  try {
    const menuData = await Menu.findOneAndDelete({
      _id: req.params.id,
    });
    if (!menuData) {
      return res.status(400).json({
        message: "menuData not found",
      });
    }
    return res.status(200).json({
      message: "menuData deleted",
      data: menuData,
    });
  } catch (err) {
    console.log(err.message);
   return  res.status(500).json({
      message: "internal server error",
    });
  }
};
