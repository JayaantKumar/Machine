const mongoose = require("mongoose");

module.exports = mongoose.model("Vendor", new mongoose.Schema({
  vendorId: String,
  name: String,
  machineId: String,
  cashfreeVendorId: String,
}));
