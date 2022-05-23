const express = require("express");
const {
	getUsers,
	createUsers,
	getToken,
	signinUser,
	createDeveloper,
	getDevToken,
	verifiedDeveloper,
} = require("../controller/userController");
const upload = require("../utils/multer");
const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id/:token").get(getToken);

router.route("/dev/:id/:token").get(getDevToken);

router.route("/dev/:id/:token").post(verifiedDeveloper);

router.route("/create").post(upload, createUsers);
router.route("/createDev").post(upload, createDeveloper);
router.route("/signin").post(signinUser);

module.exports = router;
