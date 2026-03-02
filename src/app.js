const express = require("express");
const { connectDB } = require("./config/database");
const { auth } = require("./config/authMiddleware")

const app = express();


app.use("/user", auth, async (req, res, next) => {
    // res.send("this is the user");
    next()
})

app.use("/user", (req, res, next) => {
    res.send("hello this is user")
})


connectDB().then(() => {
    console.log("database connected sucessfully")
    app.listen(3000, () => {
        console.log("app is running on port 3000");
    })
}).catch(err => {
    console.log("database connection failed")
})


