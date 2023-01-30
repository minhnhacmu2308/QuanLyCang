const express  = require("express");
const router = express.Router();
const uploadCloud = require("../middleware/uploader.js");

router.get("/test", (req,res)=>{
res.json({abc:"hihi"})
});

router.post("/upload-image", uploadCloud.single("image"),(req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  console.log("sssds",req.file.path)
  res.json({ secure_url: req.file.path });
});

module.exports = router;
