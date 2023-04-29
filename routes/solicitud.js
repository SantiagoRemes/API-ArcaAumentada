const express = require("express");
const router = express.Router();
const Solicitud = require("../controllers/solicitud.js")

router.get("/", Solicitud.getAllSolicitud);

router.post("/add", Solicitud.postSolicitud);
router.put("/update/:id", Solicitud.putSolicitud);
router.delete("/delete/:id", Solicitud.deleteSolicitud);
router.get("/bydes/:idDes", Solicitud.getSolicitudbyDes);
router.get("/tiendades/:idDes", Solicitud.getSolicitudandTiendaDes);
router.get("/tiendaadmin/:idChofer", Solicitud.getSolicitudandTiendaChofer);
router.get("/tiendaadmin", Solicitud.getSolicitudandTiendaAdmin);
router.get("/idsol/:id", Solicitud.getSolicitud);
router.post("/byestado", Solicitud.getSolicitudandByEstado);
router.get("/idesdate/:id", Solicitud.getSolicitudandIdDesDate);
router.get("/solicitudall/:id", Solicitud.getFullSolicitud)


module.exports = router;