const express = require("express");
const WorkOrderController = require("../controllers/workorder.controller");
const router = express.Router();
const {
  auth,
  authRefreshToken,
  roleBasedAuth,
} = require("../middleware/authentication.middleware");
const multer = require("multer");

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
router.post("/upload", upload.single("image"), (req, res) => {
  // Upload image to Cloudinary
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      // Handle upload error
      console.error(error);
      return res.status(500).json({ error: "Failed to upload image" });
    }

    // Image uploaded successfully
    // Access the uploaded image URL from result.secure_url
    console.log(result);
    return res.status(200).json({ imageUrl: result.secure_url });
  });
});

module.exports = router;
