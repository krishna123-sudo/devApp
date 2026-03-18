const { signupUserService, loginService, logoutService } = require("../services/authService")

const { HTTP_STATUS } = require("../utils/httpStatus");
const logger = require("../utils/logger");

const signupController = async (req, res) => {
    try {
        const result = await signupUserService(req);
        logger.info(`User signup successful: ${result?.data?._id || "unknown"}`);
        res.status(result.statusCode).json(result);
    } catch (err) {
        logger.error(`Signup failed: ${err.message}`);
        res.status(HTTP_STATUS.BAD_REQUEST).json({ messgae: err.message });
    }
}

const loginController = async (req, res) => {
    try {
        const result = await loginService(req, res);
        logger.info(`User login successful`);
        res.status(result.statusCode).json({ message: result.message, result })
    } catch (err) {
        logger.error(`Login failed: ${err.message}`);
        res.status(HTTP_STATUS.BAD_REQUEST).json({ messgae: err.message });
    }
}

const logoutController = async (req, res) => {
    try {
        const result = await logoutService(res);
        logger.info("User logout successful");
        res.status(200).json({ message: "logout sucessfull" });
    } catch (err) {
        res.status(400).json({ message: "logout failed" })
    }
}
module.exports = { signupController, loginController, logoutController };