const router = require("express").Router();
const controller = require("../controllers/promotion.controller");

router.post("/", controller.createAd);
router.get("/", controller.getAds);

module.exports = router;
