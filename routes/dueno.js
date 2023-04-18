const express = require("express");
const router = express.Router();
const Dueño = require("../controllers/dueno.js")

router.get("/", Dueño.getAllDueño);
router.get("/:id", Dueño.getDueño);
router.post("/add", Dueño.postDueño);
router.put("/update/:id", Dueño.putDueño);
router.delete("/delete/:id", Dueño.deleteDueño);


module.exports = router;