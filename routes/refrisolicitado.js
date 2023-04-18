const express = require("express");
const router = express.Router();
const RefriSolicitado = require("../controllers/refrisolicitado.js")

router.get("/", RefriSolicitado.getAllRefriSolicitado);
router.get("/:id", RefriSolicitado.getRefriSolicitado);
router.post("/add", RefriSolicitado.postRefriSolicitado);
router.put("/update/:id", RefriSolicitado.putRefriSolicitado);
router.delete("/delete/:id", RefriSolicitado.deleteRefriSolicitado);


module.exports = router;