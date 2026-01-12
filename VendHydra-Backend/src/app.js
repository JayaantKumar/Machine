const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("./services/mqttHandler");

const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const promotionRoutes = require("./routes/promotion.routes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/promotions", promotionRoutes);

module.exports = app;
