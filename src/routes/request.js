const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest")
const User = require("../models/user")



const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId
        const status = req.params.status

        const userPresent = await User.findById({ _id: toUserId });
        if (!userPresent) {
            return res.status(404).json({ message: "no user Found" })
        }

        const alloweStatus = ["ignore", "intrested"]

        if (!alloweStatus.includes(status)) {
            return res.status(400).json({ message: "invalid status type :" + status })
        }

        if (fromUserId.equals(toUserId)) {
            return res.status(400).send("Cannot send request to yourself");
        }

        //if there is existing ConnectionRequest
        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ],

        })

        if (existingConnectionRequest) {
            return res.status(400).send("connection request already exist...")
        }

        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        });
        const data = await connectionRequest.save();

        res.json({ message: "connection request send succesfully", data: data })

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const logedinUser = req.user;
        const { status, requestId } = req.params;

        //validate the status
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res, status(400).send("Status is not Valid....");
        }

        const connectionRequest = await connectionRequestModel.findOne({
            _id: requestId,
            toUserId: logedinUser._id,
            status: "intrested"
        })

        if (!connectionRequest) {
            return res.status(400).json({ message: "Connection Request not found" })
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ message: "connection request send", data });


    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = requestRouter;