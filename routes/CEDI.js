const express = require("express");
const router = express.Router();
const CEDI = require("../controllers/CEDI.js")

router.get("/", CEDI.getAllCEDI);
router.get("/:nombre", CEDI.getCEDI);
router.post("/add", CEDI.postCEDI);
router.put("/update/:nombre", CEDI.putCEDI);
router.delete("/delete/:nombre", CEDI.deleteCEDI);


module.exports = router;