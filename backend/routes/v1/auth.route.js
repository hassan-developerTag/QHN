const { signup, login } = require("../../controllers/auth.controller");
const upload = require("../../Middlewares/ImageUploading");

const router = require("express").Router();

router.post("/signup", upload.array("image", 1), signup);
router.post("/login", login);

module.exports = router;
