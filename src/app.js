require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser")


const app = express();
app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request")
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);


connectDB().then(() => {
    console.log("database connected sucessfully")
    app.listen(7777, () => {
        console.log("app is running on port 7777");
    })
}).catch(err => {
    console.log("database connection failed")
})


