const express = require("express");
const { userAuth } = require("../middlewares/auth");



const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + "send the connect request")
})

module.exports = requestRouter;