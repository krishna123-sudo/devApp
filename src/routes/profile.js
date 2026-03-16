const express = require("express");

const { userAuth } = require("../middlewares/auth");
const { profileViewController, profileEditController, profilePasswordController } = require("../controllers/profileController");


const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, profileViewController)

profileRouter.patch("/profile/edit", userAuth, profileEditController)
profileRouter.patch("/profile/password/edit", userAuth, profilePasswordController)

module.exports = profileRouter;