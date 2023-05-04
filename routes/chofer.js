const express = require("express");
const router = express.Router();
const Chofer = require("../controllers/chofer.js")

router.get("/", Chofer.getAllChofer);

//Chofer
router.get("/:id", Chofer.getChofer);


module.exports = router;