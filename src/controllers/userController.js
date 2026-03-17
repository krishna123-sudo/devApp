const { requestRecieved, userConnection, feedApi } = require("../services/userService");
const { HTTP_STATUS } = require("../utils/httpStatus");

const requestRecievedController = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const result = await requestRecieved(loggedInUser._id)

        res.status(result.statusCode).json({ result })

    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    }
}

const userConnectionController = async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connectionMatched = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "accepted"
        }).populate("fromUserId", "firstName lastName age skills about photoUrl")
            .populate("toUserId", "firstName lastName age skills about photoUrl");

        const result = await userConnection(connectionMatched);

        res.status(result.statusCode).json({ result });

    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message })
    }
}
const feedControlerApi = async (req, res) => {
    const loggedInUser = req.user
    try {
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

        const result = await feedApi(loggedInUser, hideUsersFromFeed)
        res.status(result.statusCode).json({ result });

    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message })
    }
}
module.exports = { requestRecievedController, userConnectionController, feedControlerApi }