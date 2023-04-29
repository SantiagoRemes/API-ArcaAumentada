const express = require("express");
const router = express.Router();
const RefriSolicitado = require("../controllers/refrisolicitado.js")

router.get("/", RefriSolicitado.getAllRefriSolicitado);
router.get("/:id", RefriSolicitado.getRefriSolicitado);
router.post("/add", RefriSolicitado.postRefriSolicitado);
router.put("/update/:id", RefriSolicitado.putRefriSolicitado);
router.delete("/delete/:id", RefriSolicitado.deleteRefriSolicitado);
router.post("/refriportienda", RefriSolicitado.RefriPorTienda);
router.post("/refriportiendamov", RefriSolicitado.RefriPorTiendaMov);
router.get("/refrisolicitud/:id", RefriSolicitado.RefriSolicitado);
router.get("/refrisolicitudpuertas/:id", RefriSolicitado.RefriSolicitadoPuertas);
router.get("/count/:id", RefriSolicitado.CountRefri);
router.put("/updatemovimiento/:id", RefriSolicitado.UpdateMovimiento);
router.get("/sum/:id", RefriSolicitado.SumPuertas);


module.exports = router;