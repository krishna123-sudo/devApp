const { HTTP_STATUS } = require("../utils/httpStatus");
const bcrypt = require("bcrypt");

const profileView = (req) => {
    const user = req.user;
    return {
        statusCode: HTTP_STATUS.OK,
        data: user
    }
}

const profileEdit = async (req) => {

    const loggedInUser = req.user;


    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    return {
        statusCode: HTTP_STATUS.OK,
        data: loggedInUser
    }

}

const profilePasswordEdit = async (req) => {

    const { newPassword, oldPassword } = req.body;

    const passwordEditUser = req.user;

    const isPasswordValid = await bcrypt.compare(oldPassword, passwordEditUser.password);

    if (!isPasswordValid) {
        return {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: "password is not valid"
        }
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    passwordEditUser.password = hashPassword;

    await passwordEditUser.save();

    return {
        statusCode: HTTP_STATUS.OK,
        data: passwordEditUser
    }

}


module.exports = { profileView, profileEdit, profilePasswordEdit };