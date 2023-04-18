const express = require("express");
const router = express.Router();
const Visita = require("../controllers/visita.js")

router.get("/", Visita.getAllVisita);
router.get("/:id", Visita.getVisita);
router.post("/add", Visita.postVisita);
router.put("/update/:id", Visita.putVisita);
router.delete("/delete/:id", Visita.deleteVisita);


module.exports = router;