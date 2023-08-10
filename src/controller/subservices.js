const SubMenu = require("../model/subservices");

exports.createSubServices = async (req, res) => {
    try {
      const menuData = await SubMenu.create({
        subservices:req.body.subservices,
      });
      return res.status(200).send({ msg: menuData });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        message: "internal server error",
      });
    }
  };



exports.getAllSubServices = async (req, res) => {
  try {
    const menuData = await SubMenu.find();
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


exports.getSubServicesById = async (req, res) => {
    try {
      const menuData = await SubMenu.findById({_id:req.params.id})
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



exports.updateSubServices = async (req, res) => {
  try {
    const menuData = await SubMenu.findOneAndUpdate(
      { _id: req.params.id },
      {subservices:req.body.subservices,
        },
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

exports.deleteSubMenu = async (req, res) => {
  try {
    const menuData = await SubMenu.findOneAndDelete({
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
