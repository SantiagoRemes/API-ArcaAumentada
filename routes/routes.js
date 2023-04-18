const express = require("express");
const router = express.Router();

router.use("/desarrollador", require("./desarrollador.js"));
router.use("/refrigerador", require("./refrigerador.js"));
router.use("/modelo", require("./modelo.js"));
router.use("/checklist", require("./checklist.js"));
router.use("/administrador", require("./administrador.js"));
router.use("/chofer", require("./chofer.js"));
router.use("/CEDI", require("./CEDI.js"));
router.use("/refrisolicitado", require("./refrisolicitado.js"));
router.use("/solicitud", require("./solicitud.js"));
router.use("/visita", require("./visita.js"));
router.use("/dueno", require("./dueno.js"));
router.use("/tienda", require("./tienda.js"));

module.exports = router;
