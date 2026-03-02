const express = require("express");
const { connectDB } = require("./database/database");
const { Connection } = require("mongoose");

const app = express();


app.use("/user", async (req, res) => {
    res.send("this is the user");
})



connectDB().then(() => {
    console.log("database connected sucessfully")
    app.listen(3000, () => {
        console.log("app is running on port 3000");
    })
}).catch(err => {
    console.log("database connection failed")
})


