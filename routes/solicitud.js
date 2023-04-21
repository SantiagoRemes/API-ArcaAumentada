const express = require("express");
const router = express.Router();
const Solicitud = require("../controllers/solicitud.js")

router.get("/", Solicitud.getAllSolicitud);
//router.get("/:id", Solicitud.getSolicitud);
router.post("/add", Solicitud.postSolicitud);
router.put("/update/:id", Solicitud.putSolicitud);
router.delete("/delete/:id", Solicitud.deleteSolicitud);
router.get("/bydes/:idDes", Solicitud.getSolicitudbyDes);
router.get("/tienda/:idDes", Solicitud.getSolicitudandTienda);


module.exports = router;