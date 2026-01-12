const router = require("express").Router();
const controller = require("../controllers/admin.controller");

router.post("/vendors", controller.createVendor);

module.exports = router;
