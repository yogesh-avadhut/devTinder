const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require("../middleware/auth")
const { ConnectionRequest } = require('../models/connectionRequest')
const UserModel = require("../models/user")

requestRouter.post(
    '/request/send/:status/:toUserId',
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id
            const toUserId = req.params.toUserId
            const status = req.params.status
            console.log(fromUserId)

            //handle user send himself request 
            if (fromUserId.toString() === toUserId) {
                throw new Error("you cant send connection request yourself");
            }

            //handle status send only for "interested", "ignored"
            const allowedStatus = ["interested", "ignored"]
            if (!allowedStatus.includes(status)) {
                throw new Error("invalid status type- " + status)
            }

            //handle already requested
            const alreadyRequested = await ConnectionRequest.findOne({
                $or:
                    [{ fromUserId, toUserId }, {
                        fromUserId: toUserId,
                        toUserId: fromUserId
                    }]
            })
            if (alreadyRequested) {
                throw new Error("already requested ...")
            }

            // user exist or not check
            const availableUser = await UserModel.findById(toUserId);
            if (!availableUser) {
                throw new Error("user not exist");
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            })
            const data = await connectionRequest.save()
            return res.send({
                error: false,
                message: "connection request send successfully",
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

requestRouter.post(
    "/request/send/:status/:requestId",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;
            const { status, requestId } = req.params;

            const allowedStatus = ["accepted", "rejected"];
            if (!allowedStatus.includes(status)) {
                throw new Error("status not allowed!");
            }

            const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loggedInUser._id,
                status: "interested"
            });

            if (!connectionRequest) {
                throw new Error("connection request not found!");
            }

            connectionRequest.status = status;
            const data = await connectionRequest.save();

            return res.send({
                error: false,
                message: "connection request updated successfully!",
                data
            });

        } catch (err) {
            res.status(400).send({
                error: true,
                message: err.message
            });
        }
    }
);



module.exports = { requestRouter }