const { connectionRequestModel } = require("../models/connectionRequest");
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

module.exports = { requestRecieved };