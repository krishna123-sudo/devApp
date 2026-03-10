require("dotenv").config();

const User = require("../models/user")
const jwt = require("jsonwebtoken")

const userAuth = async (req, res, next) => {
    try {
        //Read the token from the okkie
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            return res.status(401).send("Token not found.Please login again!!!")
        }

        //validate the token
        const decodedMessage = await jwt.verify(token, `${process.env.JWT_SECRET}`)
        const { _id } = decodedMessage;
        ///find the user
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("user not found")
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }

}


module.exports = {
    userAuth
}