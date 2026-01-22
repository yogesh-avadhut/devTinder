const express = required("express")
const mongoose = require("mongoose")
const userAuth = require("../middleware/auth")
const userRouter = express.Router()
const ConnectionRequest = require("../models/connectionRequest")


userRouter.get('/user/request/received', async (req, res) => {
    try {
        const loggedInUser = req.user
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["fristName", "lastname"])

        res.send({
            error: false,
            message: "data fethed sucessfully",
            data: connectionRequest
        })
    }
    catch (err) {
        res.send({
            error: true,
            message: err.message
        })
    }
})



userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", "fristName lastName")
            .populate("toUserId", "fristName lastName")

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId
        })
        res.send({
            error: false,
            message: "data fatched successfully...",
            data: data
        })
    }
    catch (err) {
        res.send({
            error: true,
            message: err.message
        })
    }
})


