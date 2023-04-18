const express = require("express");
const router = express.Router();
const Refrigerador = require("../controllers/refrigerador.js")

router.get("/", Refrigerador.getAllRefrigerador);
router.get("/:id", Refrigerador.getRefrigerador);
router.post("/add", Refrigerador.postRefrigerador);
router.put("/update/:id", Refrigerador.putRefrigerador);
router.delete("/delete/:id", Refrigerador.deleteRefrigerador);


module.exports = router;