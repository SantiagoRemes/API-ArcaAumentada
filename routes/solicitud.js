const express = require("express");
const router = express.Router();
const Solicitud = require("../controllers/solicitud.js")

router.get("/", Solicitud.getAllSolicitud);
router.get("/:id", Solicitud.getSolicitud);
router.post("/add", Solicitud.postSolicitud);
router.put("/update/:id", Solicitud.putSolicitud);
router.delete("/delete/:id", Solicitud.deleteSolicitud);


module.exports = router;