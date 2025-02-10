const { signup, login, postKYCDocuments, getAllKYC, approveKYC, rejectKyc, postHealthData, getHealthData, postDataRequest, getDataRequest, getAllDataRequests, approveDataRequest, rejectDataRequest } = require("../Controllers/AuthController");
const ensureAuthenticated = require("../Middlewares/Auth");
const upload = require("../Middlewares/ImageUploading");

const router = require("express").Router();

router.post("/signup", upload.array('image', 1), signup)
router.post("/login", login)
router.post("/postKYCDocuments", ensureAuthenticated, upload.array('documents', 10), postKYCDocuments)
router.get("/admin/getAllKYC", getAllKYC)
router.put("/admin/approveKYC/:id", approveKYC)
router.put("/admin/rejectKYC/:id", rejectKyc)
router.post("/uploadHealthData", ensureAuthenticated, upload.array('file', 10), postHealthData)
router.get("/getHealthData", ensureAuthenticated, getHealthData)
router.post("/partner/postDataRequest", ensureAuthenticated, postDataRequest)
router.get("/partner/getDataRequest", ensureAuthenticated, getDataRequest)
router.get("/admin/getAllDataRequests", getAllDataRequests)
router.put("/admin/approveDataRequest/:id", approveDataRequest)
router.put("/admin/rejectDataRequest/:id", rejectDataRequest)

module.exports = router