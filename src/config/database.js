const mongoose = require("mongoose");
require("dotenv").config();


const secretkey = process.env.MONGO_SECRET

const URL = `mongodb+srv://namasteDev:${secretkey}@namstenode.rufpegc.mongodb.net/devTinder`;

const connectDB = async () => {
    try {
        await mongoose.connect(URL)
    } catch (err) {
        console.log("connection failed")
    }
}

module.exports = { connectDB };