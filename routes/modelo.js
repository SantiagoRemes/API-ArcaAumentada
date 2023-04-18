const express = require("express");
const router = express.Router();
const Modelo = require("../controllers/modelo.js")

router.get("/", Modelo.getAllModelo);
router.get("/:id", Modelo.getModelo);
router.post("/add", Modelo.postModelo);
router.put("/update/:id", Modelo.putModelo);
router.delete("/delete/:id", Modelo.deleteModelo);


module.exports = router;