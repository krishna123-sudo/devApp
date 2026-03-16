const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest")
const { requestSendController, reviewController } = require("../controllers/requestController");



const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, requestSendController)

requestRouter.post("/request/review/:status/:requestId", userAuth, reviewController)

module.exports = requestRouter;