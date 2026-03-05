const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const { loginValidate } = require("../utils/loginvalidation");
const { validateUser } = require("../utils/validates")



authRouter.post("/signup", async (req, res) => {
    try {
        //validation
        validateUser(req)

        //password bcrypt
        const { firstName, lastName, emailId, password, skills } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        const skillArray = Array.isArray(req.body.skills) ? req.body.skills : [];
        //data flow
        const emailData = req.body.emailId;
        const users = new User(
            {
                firstName,
                lastName,
                emailId,
                password: hashedPassword,
                skills: skillArray
            }
        );

        const existingUser = await User.findOne({ emailId: emailData });
        if (existingUser) {
            return res.status(400).send("email already exist");
        }
        await users.save();
        res.send("user created sucessfully");
    } catch (err) {
        res.status(400).send("error occurs while saving :" + err.message)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        loginValidate(req);

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("invalid Credentials")
        }
        const isPasswordValid = await user.getPasswordValid(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token,
                {
                    expires: new Date(Date.now() + 900000)
                });
            res.send("Login Suceesfull")
        } else {
            res.status(400).send("invalid credentials");
        }


    } catch (error) {
        res.status(400).send("invalid credentials :" + error.message)
    }
})

authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        })

        res.send("logout suceesfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

module.exports = authRouter;