const Order = require("../models/Order");
const Vendor = require("../models/Vendor");
const cashfree = require("../config/cashfree");
const { v4: uuid } = require("uuid");

exports.createOrder = async (req, res) => {
  const { items, totalAmount, machineId } = req.body;
  const orderId = `ord_${uuid().slice(0,8)}`;

  const vendor = await Vendor.findOne({ machineId });

  if (vendor) {
    const cfRes = await cashfree.post("/orders", {
      order_id: orderId,
      order_amount: totalAmount,
      order_currency: "INR",
      customer_details: { customer_id: "guest", customer_phone: "9999999999" },
      order_meta: {
        return_url: `http://localhost:5173/payment-return.html?order_id=${orderId}`
      },
      split_details: [{ vendor_id: vendor.cashfreeVendorId, amount: totalAmount * 0.9 }]
    });

    await Order.create({ orderId, items, totalAmount, status: "PENDING" });

    return res.json({ orderId, paymentSessionId: cfRes.data.payment_session_id });
  }

  await Order.create({ orderId, items, totalAmount, status: "PENDING" });
  res.json({ orderId });
};
