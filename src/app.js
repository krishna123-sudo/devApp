const express = require("express");
const { connectDB } = require("./config/database");
const { auth } = require("./config/authMiddleware")
const User = require("./models/user");
const { validateUser } = require("./utils/validates")
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.get("/users", async (req, res) => {
    try {
        const userData = await User.find({});
        res.send(userData)
    } catch (error) {
        res.status(400).send("cant able to fetch the user");
    }
})


app.get("/user/:userId", async (req, res) => {
    const id = req.params.userId;
    try {
        const userDataByID = await User.find({ _id: id });
        console.log(userDataByID)
        res.send(userDataByID)
    } catch (error) {
        res.status(400).send("cant get user on this user id");
    }

})

app.delete("/user/:userId", async (req, res) => {
    const id = req.params.userId;
    try {
        const deleteUser = await User.findByIdAndDelete({ _id: id })
        res.send("User Deleted:" + deleteUser);
    } catch (err) {
        res.status(400).send("Cant able to delete user for this userID");
    }
})

app.patch("/user/:userId", async (req, res) => {
    const id = req.params.userId;
    const data = req.body;
    const allowedRoutes = [
        "lastName", "age", "skills", "about"
    ]
    try {
        const isUpdateAllowed = Object.keys(data).every(k => allowedRoutes.includes(k));
        if (!isUpdateAllowed) {
            res.send("not allowed");
        } else {
            const UpdatedUser = await User.findByIdAndUpdate({ _id: id }, data, { returnDocument: "after", runValidators: true })
            res.send(UpdatedUser)
        }

    } catch (err) {
        res.status(400).send("can able to update this UserId" + err.message)
    }
})

connectDB().then(() => {
    console.log("database connected sucessfully")
    app.listen(7777, () => {
        console.log("app is running on port 7777");
    })
}).catch(err => {
    console.log("database connection failed")
})


