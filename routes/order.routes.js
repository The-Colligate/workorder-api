const express = require("express");
const WorkOrderController = require("../controllers/workorder.controller");
const router = express.Router();
const {
  auth,
  authRefreshToken,
  roleBasedAuth,
} = require("../middleware/authentication.middleware");

router.post("/init", WorkOrderController.initWorkOrder);

router.post("/continue", WorkOrderController.continue);

router.post("/approve", WorkOrderController.approve);

module.exports = router;
