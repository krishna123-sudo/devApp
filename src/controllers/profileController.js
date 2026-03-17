const { profileView, profileEdit, profilePasswordEdit } = require("../services/profileService");
const { HTTP_STATUS } = require("../utils/httpStatus");
const { validateEditProfileUser } = require("../utils/validates");
const logger = require("../utils/logger");

const profileViewController = async (req, res) => {
    try {
        const result = await profileView(req);
        logger.info(`Profile fetched successfully for user: ${req.user?._id}`);
        res.status(result.statusCode).json({ result })
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    }
}

const profileEditController = async (req, res) => {
    try {
        if (!validateEditProfileUser(req)) {
            logger.warn(`Invalid edit attempt by user: ${req.user?._id}`);
            throw new Error("edit field is not valid")
        };

        const result = await profileEdit(req);
        logger.info(`Profile updated successfully for user: ${req.user?._id}`);

        res.status(result.statusCode).json({ messgae: "User Updated successfully", data: result })

    } catch (err) {
        logger.error(`Profile view failed: ${err.message}`);
        res.status(HTTP_STATUS.BAD_REQUEST).json({ err: err.message });
    }
}

const profilePasswordController = async (req, res) => {
    try {
        const { newPassword, oldPassword } = req.body;
        if (!newPassword || !oldPassword) {
            logger.warn(`Missing password fields for user: ${req.user?._id}`);
            res.statusCode(HTTP_STATUS.BAD_REQUEST).json({ message: "give the required fields" });
        }

        const result = await profilePasswordEdit(req);
        logger.info(`Password changed successfully for user: ${req.user?._id}`);

        res.status(result.statusCode).json({ result })
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    }
}

module.exports = { profileViewController, profileEditController, profilePasswordController };