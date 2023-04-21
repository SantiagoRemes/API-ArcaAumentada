const express = require("express");
const router = express.Router();
const Chofer = require("../controllers/chofer.js")

router.get("/", Chofer.getAllChofer);
//router.get("/:id", Chofer.getChofer);
router.post("/add", Chofer.postChofer);
router.put("/update/:id", Chofer.putChofer);
router.delete("/delete/:id", Chofer.deleteChofer);
router.post("/login", Chofer.loginChofer);


module.exports = router;