const express = require("express");

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

module.exports = profileRouter;