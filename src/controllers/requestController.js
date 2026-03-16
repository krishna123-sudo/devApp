const { requestSend, requestReview } = require("../services/requestService");
const { HTTP_STATUS } = require("../utils/httpStatus");

const requestSendController = async (req, res) => {
    try {
        const result = await requestSend(req);
        res.status(result.statusCode).json({ result })
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ err: err.message });
    }
}


const reviewController = async (req, res) => {
    try {
        const result = await requestReview(req);
        res.status(result.statusCode).json({ result });
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    }
}

module.exports = { requestSendController, reviewController };