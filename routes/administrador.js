const express = require("express");
const router = express.Router();
const Administrador = require("../controllers/administrador.js")

router.get("/", Administrador.getAllAdministrador);
router.get("/:id", Administrador.getAdministrador);
router.post("/add", Administrador.postAdministrador);
router.put("/update/:id", Administrador.putAdministrador);
router.delete("/delete/:id", Administrador.deleteAdministrador);


module.exports = router;