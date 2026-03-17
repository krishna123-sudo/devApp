const express = require("express");
const { userAuth } = require("../middlewares/auth");

const { requestRecievedController, userConnectionController, feedControlerApi } = require("../controllers/userController");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"


//Get all the pending connection request for the logged in user
userRouter.get("/user/requests/recieved", userAuth, requestRecievedController);

userRouter.get("/user/connection", userAuth, userConnectionController)

userRouter.get("/feed", userAuth, feedControlerApi);

module.exports = userRouter;