const { requestRecieved } = require("../services/userService");
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

module.exports = { requestRecievedController }