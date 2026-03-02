const express = require("express");
const { connectDB } = require("./config/database");
const { auth } = require("./config/authMiddleware")
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const data = req.body;
    const users = new User(data);
    try {
        await users.save();
        res.send("user created sucessfully");
    } catch (err) {
        res.status(400).send("error occurs while saving :" + err.message)
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


