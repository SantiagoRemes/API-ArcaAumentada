const express = require("express");
const router = express.Router();
const Checklist = require("../controllers/checklist.js")

router.get("/", Checklist.getAllChecklist);
router.get("/:id", Checklist.getChecklist);
router.post("/add", Checklist.postChecklist);
router.put("/update/:id", Checklist.putChecklist);
router.delete("/delete/:id", Checklist.deleteChecklist);


module.exports = router;