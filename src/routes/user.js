const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest");

const userRouter = express.Router();


//Get all the pending connection request for the logged in user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await connectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "intrested" },
                { toUserId: loggedInUser._id, status: "intrested" },
            ],
        }).populate("fromUserId", "firstName lastName age skills about");

        res.json({ message: "data fetched suceesfullt", data: connectionRequest })
    } catch (err) {
        res.status(404).send("Error: " + err.message);
    }
})

userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionMatched = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "accepted"
        }).populate("fromUserId", "firstName lastName age skills about")
            .populate("toUserId", "firstName lastName age skills about");

        const data = connectionMatched.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId

        });

        res.json({ message: "data fetched successfully", data: data })

    } catch (error) {
        res.status(404).send("Error: " + error.message)
    }
})

module.exports = userRouter;