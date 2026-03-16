const { profileView, profileEdit, profilePasswordEdit } = require("../services/profileService");
const { HTTP_STATUS } = require("../utils/httpStatus");
const { validateEditProfileUser } = require("../utils/validates");

const profileViewController = async (req, res) => {
    try {
        const result = await profileView(req);
        res.status(result.statusCode).json({ message: "user fetched sucessfully", result })
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    }
}

const profileEditController = async (req, res) => {
    try {
        if (!validateEditProfileUser(req)) {
            throw new Error("edit field is not valid")
        };

        const result = await profileEdit(req);

        res.status(result.statusCode).json({ messgae: "User Updated successfully", data: result })

    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ err: err.message });
    }
}

const profilePasswordController = async (req, res) => {
    const { newPassword, oldPassword } = req.body;
    if (!newPassword || !oldPassword) {
        res.statusCode(HTTP_STATUS.BAD_REQUEST).json({ message: "give the required fields" });
    }

    const result = await profilePasswordEdit(req);

    res.status(result.statusCode).json({ message: "password updated successfully", result })
}

module.exports = { profileViewController, profileEditController, profilePasswordController };