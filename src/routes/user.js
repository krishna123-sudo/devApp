const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");
const { requestRecievedController } = require("../controllers/userController");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"


//Get all the pending connection request for the logged in user
userRouter.get("/user/requests/recieved", userAuth, requestRecievedController);

userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionMatched = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "accepted"
        }).populate("fromUserId", "firstName lastName age skills about photoUrl")
            .populate("toUserId", "firstName lastName age skills about photoUrl");

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

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        //user should see al the user card except
        //0.his own card
        //1.his connection
        //2.ignored people
        //already send the connection request

        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit
        const skip = (page - 1) * limit;

        //find all the connection req send+recieve
        const connectionRequest = await connectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("toUserId fromUserId")

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })


        const user = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.send(user);


    } catch (error) {
        res.status(400).json({ messgae: error.message })
    }
})

module.exports = userRouter;