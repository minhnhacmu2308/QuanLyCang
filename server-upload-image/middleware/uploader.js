const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: "db18w7hbk",
    api_key: "564837747951159",
    api_secret: "LgGKU5Qeze-EE37UkvovD1bM_WY",
  });

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
