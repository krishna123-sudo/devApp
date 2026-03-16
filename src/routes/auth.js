const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const { loginValidate } = require("../utils/loginvalidation");
const { validateUser } = require("../utils/validates");
const { signupController, loginController, logoutController } = require("../controllers/authController");



authRouter.post("/signup", signupController)

authRouter.post("/login", loginController)

authRouter.post("/logout", logoutController)

module.exports = authRouter;