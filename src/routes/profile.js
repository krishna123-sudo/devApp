const express = require("express");
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileUser } = require("../utils/validates")


const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("can able to get profile")
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileUser(req)) {
            throw new Error("edit field is not valid")
        };

        const loggedInUser = req.user;
        console.log(loggedInUser);


        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        // console.log(loggedInUser);

        await loggedInUser.save();

        res.json({ message: `${loggedInUser.firstName} updated sucessfuly`, data: loggedInUser })

    } catch (err) {
        res.status(400).send("cant able to update profile:  " + err.message)
    }
})
profileRouter.patch("/profile/password/edit", userAuth, async (req, res) => {

    try {
        const { newPassword, oldPassword } = req.body;
        if (!newPassword || !oldPassword) {
            throw new Error("no password profiled to edit");
        }

        const passwordEditUser = req.user;

        const isPasswordValid = await bcrypt.compare(oldPassword, passwordEditUser.password);

        if (!isPasswordValid) {
            throw new Error("the old password u put is not valid")
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        passwordEditUser.password = hashPassword;

        await passwordEditUser.save();

        res.json({ message: "Password Update Sucessfully", data: passwordEditUser })
    } catch (error) {
        res.status(400).send("Error:" + error.message);
    }


})

module.exports = profileRouter;