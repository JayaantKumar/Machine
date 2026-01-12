const mongoose = require("mongoose");

module.exports = mongoose.model("Ad", new mongoose.Schema({
  name: String,
  mediaUrl: String,
  mediaType: String,
  duration: Number,
  machineId: String,
  isActive: Boolean,
}));
