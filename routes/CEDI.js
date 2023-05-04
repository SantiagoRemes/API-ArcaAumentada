const express = require("express");
const router = express.Router();
const CEDI = require("../controllers/CEDI.js")

router.get("/", CEDI.getAllCEDI);

//All
router.get("/:nombre", CEDI.getCEDI);



module.exports = router;