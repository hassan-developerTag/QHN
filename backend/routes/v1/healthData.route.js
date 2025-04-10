const { postHealthData, getHealthData } = require("../../controllers/healthData.controller");
const ensureAuthenticated = require("../../Middlewares/Auth");
const upload = require("../../Middlewares/ImageUploading");


const router = require("express").Router();

router.post(
  "/uploadHealthData",
  ensureAuthenticated,
  upload.array("file", 10),
  postHealthData
);
router.get("/getHealthData", ensureAuthenticated, getHealthData);

module.exports = router;
