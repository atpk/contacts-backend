const express = require("express");
const { registerUser, loginUser, userInfo } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/info").get(validateToken, userInfo);

module.exports = router;