const { postKYCDocuments, getAllKYC, approveKYC, rejectKyc } = require("../../controllers/KYCDocument.controller");
const ensureAuthenticated = require("../../Middlewares/Auth");
const upload = require("../../Middlewares/ImageUploading");

const router = require("express").Router();

router.post("/postKYCDocuments", ensureAuthenticated, upload.array('documents', 10), postKYCDocuments)
router.get("/admin/getAllKYC", getAllKYC)
router.put("/admin/approveKYC/:id", approveKYC)
router.put("/admin/rejectKYC/:id", rejectKyc)

module.exports = router