const express = require("express");
const router = express.Router();
const Solicitud = require("../controllers/solicitud.js")

router.get("/", Solicitud.getAllSolicitud);


//Desarrollador
router.get("/idesdate/:id", Solicitud.getSolicitudandIdDesDate);
router.post("/byestado", Solicitud.getSolicitudandByEstado);
router.get("/tiendades/:idDes", Solicitud.getSolicitudandTiendaDes);
//post solicitud

//Admin
router.put("/aceptarcambios", Solicitud.ActualizarSolicitud);
router.delete("/borrarsolicitud/:id", Solicitud.BorrarSolicitud);
router.put("/chofer/:id", Solicitud.putChofer);
router.get("/tiendaadmin", Solicitud.getSolicitudandTiendaAdmin);
router.put("/update/:id", Solicitud.putSolicitud);
router.post("/byestadoadmin", Solicitud.getSolicitudandByEstadoAdmin);

//Chofer
router.get("/chofer/:idChofer", Solicitud.getSolicitudChofer);
router.put("/terminar/:id", Solicitud.TerminarSolicitud);
router.post("/byestadochofer", Solicitud.getSolicitudandByEstadoChofer);

//All
router.get("/solicitudall/:id", Solicitud.getFullSolicitud);


module.exports = router;