const express = require("express");
const router = express.Router();
const Administrador = require("../controllers/administrador.js")

router.get("/", Administrador.getAllAdministrador);

//Administrador
router.get("/:id", Administrador.getAdministrador);



module.exports = router;