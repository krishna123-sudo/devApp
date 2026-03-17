const { connectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");
const { HTTP_STATUS } = require("../utils/httpStatus");

const requestRecieved = async (userId) => {

    const connectionRequest = await connectionRequestModel.find({
        $or: [
            // { fromUserId: loggedInUser._id, status: "intrested" },
            { toUserId: userId, status: "intrested" },
        ],
    }).populate("fromUserId", "firstName lastName age skills about photoUrl")
        .populate("toUserId", "firstName lastName age skills about photoUrl")

    return {
        statusCode: HTTP_STATUS.OK,
        data: connectionRequest
    }

}

const userConnection = async (connectionMatched) => {

    const data = connectionMatched.map(row => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
            return row.toUserId;
        }
        return row.fromUserId

    });

    return {
        statusCode: HTTP_STATUS.OK,
        message: "User fetched successfully",
        data: data
    }

}
const feedApi = async (loggedInUser, hideUsersFromFeed) => {
    //user should see al the user card except
    //0.his own card
    //1.his connection
    //2.ignored people
    //already send the connection request
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit
    const skip = (page - 1) * limit;

    const user = await User.find({
        $and: [
            { _id: { $nin: Array.from(hideUsersFromFeed) } },
            { _id: { $ne: loggedInUser._id } }]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)

    return {
        statusCode: HTTP_STATUS.OK,
        data: user
    }
}

module.exports = { requestRecieved, userConnection, feedApi };