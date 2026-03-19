require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const http = require("http");

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request")
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");


const app = express();

require("./utils/cronJobs")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());



app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

const server = http.createServer(app);

initializeSocket(server);

connectDB().then(() => {
    console.log("database connected sucessfully")
    server.listen(7777, () => {
        console.log("app is running on port 7777");
    })
}).catch(err => {
    console.log("database connection failed")
})


