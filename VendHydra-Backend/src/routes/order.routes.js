const router = require("express").Router();
const controller = require("../controllers/order.controller");

router.post("/", controller.createOrder);

module.exports = router;
