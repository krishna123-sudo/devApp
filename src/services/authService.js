const User = require("../models/user");
const { HTTP_STATUS } = require("../utils/httpStatus");
const { loginValidate } = require("../utils/loginvalidation");
const { validateUser } = require("../utils/validates");
const bcrypt = require("bcrypt");


const signupUserService = async (req) => {

    //validation
    validateUser(req)

    //password bcrypt
    const { firstName, lastName, emailId, password, skills, photoUrl, about } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    const skillArray = Array.isArray(req.body.skills) ? req.body.skills : [];
    //data flow
    const emailData = req.body.emailId;
    const users = new User(
        {
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            skills: skillArray,
            about,
            photoUrl
        }
    );

    const existingUser = await Use.findOne({ emailId: emailData });
    if (existingUser) {
        return {
            statusCode: HTTP_STATUS.DUPLICATE,
            data: "User already exists",
        }
    }
    await users.save();

    return {
        statusCode: HTTP_STATUS.CREATED,
        data: users
    };
}

const loginService = async (req, res) => {

    const { emailId, password } = req.body;

    loginValidate(req);

    const user = await User.findOne({ emailId: emailId })
    if (!user) {
        return {
            statusCode: 400,
            message: "invalid Credentials"
        }
    }
    const isPasswordValid = await user.getPasswordValid(password);

    if (isPasswordValid) {
        const token = await user.getJWT();
        res.cookie("token", token,
            {
                expires: new Date(Date.now() + 900000)
            });


        return {
            statusCode: 200,
            data: user
        }
    } else {
        // res.status(400).json({ message: "invalid credentials" });
        return {
            statusCode: 400,
            message: "invalid credentials"
        }
    }

}

const logoutService = async (res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
}

module.exports = { signupUserService, loginService, logoutService };