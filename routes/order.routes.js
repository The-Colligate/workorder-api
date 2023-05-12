const express = require("express");
const WorkOrderController = require("../controllers/workorder.controller");
const router = express.Router();
const {
  auth,
  authRefreshToken,
  roleBasedAuth,
} = require("../middleware/authentication.middleware");
const multer = require("multer");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "di4sa2aql",
  api_key: "647118775982788",
  api_secret: "tORXDSHzvL5X89BuoP5b2OzAGrg",
});

const upload = multer({ dest: "uploads/" });

router.get("/", auth, WorkOrderController.getWorkOrder);

router.get("/no-auth", WorkOrderController.getWorkOrderNoAuth);

router.get("/all", WorkOrderController.getAllWorkOrder);

router.post("/init", WorkOrderController.initWorkOrder);

router.post("/continue", WorkOrderController.continue);

router.post("/approve", WorkOrderController.approve);

router.get("/company", WorkOrderController.getCompany);

router.get("/payment", WorkOrderController.getPayment);

// Image upload route
router.post("/upload", upload.array("images", 10), (req, res) => {
  const files = req.files;

  // Upload each image to Cloudinary
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (error, result) => {
        if (error) {
          // Handle upload error
          console.error(error);
          reject(error);
        } else {
          // Delete the uploaded image from the local uploads folder
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error(err);
            }
          });

          resolve(result.secure_url);
        }
      });
    });
  });

  // Wait for all uploads to complete
  Promise.all(uploadPromises)
    .then((uploadedImages) => {
      // All images uploaded successfully
      console.log(uploadedImages);
      return res.status(200).json({ images: uploadedImages });
    })
    .catch((error) => {
      // Error occurred during image upload
      console.error(error);
      return res.status(500).json({ error: "Failed to upload images" });
    });
});

module.exports = router;
