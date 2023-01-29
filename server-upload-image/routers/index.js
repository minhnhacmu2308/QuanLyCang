const express = require("express");
const router = express.Router();
const uploadCloud = require("../middleware/uploader.js");
const {uploadImg} = require("../controllers/index.js");

router.post("/upload-image", uploadCloud.single("image"),(req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
   
    res.json({ secure_url: req.file.path });
  });
module.exports = router;