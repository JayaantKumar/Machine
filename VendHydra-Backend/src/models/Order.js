const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  slot: String,
  price: Number,
  scoops: Number,
  image: String,
});

module.exports = mongoose.model("Order", new mongoose.Schema({
  orderId: { type: String, unique: true },
  items: [orderItemSchema],
  totalAmount: Number,
  status: String,
  progress: Number,
  currentStep: String,
}, { timestamps: true }));
