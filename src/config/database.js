const mongoose = require("mongoose");
require("dotenv").config();


const URL = `mongodb+srv://namasteDev:${process.env.MONGO_SECRET}@namstenode.rufpegc.mongodb.net/devTinder`;

const connectDB = async () => {
    try {
        await mongoose.connect(URL)
    } catch (err) {
        console.log("connection failed")
    }
}

module.exports = { connectDB };