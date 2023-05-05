const express = require("express");
const router = express.Router();

const Image = require("../controllers/image.js");
const {uploadMiddleware} = require("../middleware/upload.js");

router.post(
    "/add/:id",
    uploadMiddleware.single("archivo"),
    Image.addImage
)

module.exports = router;