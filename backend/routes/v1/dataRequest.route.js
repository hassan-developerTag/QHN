const { getUserData, postDataRequest, getDataRequest, getAllDataRequests, approveDataRequest, rejectDataRequest } = require("../../controllers/dataRequest.controller");
const ensureAuthenticated = require("../../Middlewares/Auth");

const router = require("express").Router();

router.get("/getUserData", ensureAuthenticated, getUserData);
router.post("/partner/postDataRequest", ensureAuthenticated, postDataRequest);
router.get("/partner/getDataRequest", ensureAuthenticated, getDataRequest);
router.get("/admin/getAllDataRequests", getAllDataRequests);
router.put("/admin/approveDataRequest/:id", approveDataRequest);
router.put("/admin/rejectDataRequest/:id", rejectDataRequest);

module.exports = router;
