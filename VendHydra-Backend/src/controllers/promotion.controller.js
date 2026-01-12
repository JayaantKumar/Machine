const Ad = require("../models/Ad");

exports.createAd = async (req, res) => {
  const ad = await Ad.create(req.body);
  res.json({ success: true, ad });
};

exports.getAds = async (req, res) => {
  const ads = await Ad.find();
  res.json(ads);
};
