const { connectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");
const { HTTP_STATUS } = require("../utils/httpStatus");



const requestSend = async (req, res) => {

    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId
    const status = req.params.status

    const userPresent = await User.findById({ _id: toUserId });
    if (!userPresent) {
        return {
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: "User not found"
        }
    }

    const alloweStatus = ["ignore", "intrested"]

    if (!alloweStatus.includes(status)) {
        return {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: "not a valid Status"
        }
    }

    if (fromUserId.equals(toUserId)) {
        return {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: "Cant send Itself"
        }
    }

    //if there is existing ConnectionRequest
    const existingConnectionRequest = await connectionRequestModel.findOne({
        $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
        ],

    })

    if (existingConnectionRequest) {
        return {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: "user already exist"
        }
    }

    const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status
    });
    const data = await connectionRequest.save();

    return {
        statusCode: HTTP_STATUS.OK,
        message: "Request send successfully",
        data: data
    }

}

const requestReview = async (req) => {

    const logedinUser = req.user;
    const { status, requestId } = req.params;

    //validate the status
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
        return {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: "status is not valid"
        }
    }

    const connectionRequest = await connectionRequestModel.findOne({
        _id: requestId,
        toUserId: logedinUser._id,
        status: "intrested"
    })

    if (!connectionRequest) {
        return {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: "connection request not found"
        }
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    return {
        statusCode: HTTP_STATUS.OK,
        data: data
    }
}

module.exports = { requestSend, requestReview }