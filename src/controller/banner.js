const BannerModel = require('../model/banner');
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await BannerModel.find();
    return res.json(banners);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getBannerById = async (req, res) => {
  try {
    const banner = await BannerModel.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    return res.json(banner);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.createBanner = async (req, res) => {
  try {
    const newBanner = new BannerModel(req.body);
    const savedBanner = await newBanner.save();
    return res.status(201).json(savedBanner);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateBanner = async (req, res) => {
  try {
    const banner = await BannerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    return res.json(banner);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await BannerModel.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    return res.json({ message: 'Banner deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
