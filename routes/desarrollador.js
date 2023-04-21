const express = require("express");
const router = express.Router();
const Desarrollador = require("../controllers/desarrollador.js")

router.get("/", Desarrollador.getAllDesarrollador);
//router.get("/:id", Desarrollador.getDesarrollador);
router.post("/add", Desarrollador.postDesarrollador);
router.put("/update/:id", Desarrollador.putDesarrollador);
router.delete("/delete/:id", Desarrollador.deleteDesarrollador);
router.post("/login", Desarrollador.loginDesarrollador);


module.exports = router;