const { signupUserService, loginService, logoutService } = require("../services/authService")

const { HTTP_STATUS } = require("../utils/httpStatus");

const signupController = async (req, res) => {
    try {
        const result = await signupUserService(req);
        res.status(result.statusCode).json(result);
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ messgae: err.message });
    }
}

const loginController = async (req, res) => {
    try {
        const result = await loginService(req, res);
        res.status(result.statusCode).json(result)
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ messgae: err.message });
    }
}

const logoutController = async (req, res) => {
    try {
        const result = await logoutService(res);
        res.status(200).json({ message: "logout sucessfull" });
    } catch (err) {
        res.status(400).json({ message: "logout failed" })
    }
}
module.exports = { signupController, loginController, logoutController };