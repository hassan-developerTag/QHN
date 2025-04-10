const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const appConfig = require("../config/app.config");

cloudinary.config({
  cloud_name: appConfig.cloudinary.cloud_name,
  api_key: appConfig.cloudinary.api_key,
  api_secret: appConfig.cloudinary.api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folderName = "qhn_project/images";

    if (file.mimetype === "application/pdf") {
      folderName = "qhn_project/pdfs";
    }

    return {
      folder: folderName,
      format: file.mimetype === "application/pdf" ? "pdf" : "jpg",
      resource_type: "raw",
      access_mode: "public",
      public_id: `pdf-${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });
module.exports = upload;
