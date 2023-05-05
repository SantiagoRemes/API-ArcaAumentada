var appRoot = require("app-root-path");
const path = require("path");

const multer = require("multer");
const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        let fullPath = path.join(appRoot + '/images/');
        callback(null, fullPath);
    },
    filename: (req, file, callback) => {
        let extension = "." + file.originalname.split(".").pop();
        callback(null, file.fieldname + "-" + Date.now() + extension);
    },
});
const uploadMiddleware = multer({ storage: storageConfig});

module.exports = {uploadMiddleware};