const mongoose = require("mongoose");

const URL = "mongodb+srv://namasteDev:Kisu123@namstenode.rufpegc.mongodb.net/";

const connectDB = async () => {
    try {
        await mongoose.connect(URL)
    } catch (err) {
        console.log("connection failed")
    }
}

module.exports = { connectDB };