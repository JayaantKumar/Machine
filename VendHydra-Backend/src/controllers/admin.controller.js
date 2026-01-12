const Vendor = require("../models/Vendor");

exports.createVendor = async (req, res) => {
  const { vendorId, name, machineId, cashfreeVendorId } = req.body;

  if (!vendorId || !machineId || !cashfreeVendorId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const exists = await Vendor.findOne({ machineId });
  if (exists) return res.status(400).json({ error: "Machine already linked" });

  const vendor = await Vendor.create({ vendorId, name, machineId, cashfreeVendorId });
  res.json(vendor);
};
