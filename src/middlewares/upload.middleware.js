const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const createStorage = (folder) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `portfolio/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
    },
  });

const uploadImage = (folder) =>
  multer({ storage: createStorage(folder) }).single("image");

const uploadPDF = multer({ storage: createStorage("resume") }).single("file");

module.exports = { uploadImage, uploadPDF };