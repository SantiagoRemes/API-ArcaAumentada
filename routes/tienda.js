const express = require("express");
const router = express.Router();
const Tienda = require("../controllers/tienda.js")

router.get("/", Tienda.getAllTienda);
router.get("/:id", Tienda.getTienda);
router.post("/add", Tienda.postTienda);
router.put("/update/:id", Tienda.putTienda);
router.delete("/delete/:id", Tienda.deleteTienda);


module.exports = router;