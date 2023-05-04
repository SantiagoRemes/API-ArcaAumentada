const express = require("express");
const router = express.Router();
const Desarrollador = require("../controllers/desarrollador.js")

router.get("/", Desarrollador.getAllDesarrollador);

// Desarrollador
router.get("/:id", Desarrollador.getDesarrollador);


// All
router.post("/login", Desarrollador.loginDesAdminChofer);


module.exports = router;