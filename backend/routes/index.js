const router = require("express").Router();

const authRoutes = require("./v1/auth.route");
const dataRequestRoutes = require("./v1/dataRequest.route");
const healthDataRoutes = require("./v1/healthData.route");
const KYCDocumentRoutes = require("./v1/KYCDocument.route");

router.use("/auth", authRoutes);
router.use("/dataRequest", dataRequestRoutes);
router.use("/healthData", healthDataRoutes);
router.use("/kycDocument", KYCDocumentRoutes);

module.exports = router;