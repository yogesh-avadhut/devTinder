const express = require("express")
const { userAuth } = require("../middleware/auth")
const { validateEditProfileData } = require("../utility/validation")
const UserModel = require("../models/user")
const profileRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        res.send({
            error: false,
            data: req.user
        })
    }
    catch (err) {
        res.send({
            error: true,
            message: err.message
        })
    }

})

profileRouter.post("/edit-profile", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("fields are not editable")
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user._id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.send({
            error: false,
            message: "Profile updated successfully",
            data: updatedUser
        });
    }
    catch (err) {
        res.send({
            error: true,
            message: err.message
        })
    }

})

profileRouter.post("/edit-profile-password-by-old-password", userAuth, async (req, res) => {
    try {
        const { token } = req.cookies
        const decodingObj = await jwt.verify(token, "MySecret@1212")
        const _id = decodingObj._id
        const password = req.body.password

        const user = await UserModel.findById(_id)
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (isValidPassword) {
            const newPassword = req.body.newPassword
            const newHashedPassword = await bcrypt.hash(newPassword, 10)
            const updatePass = await UserModel.findByIdAndUpdate(
                req.user._id,
                { $set: { password: newHashedPassword } },
                { new: true, runValidators: true }
            );
            res.send({
                error: false,
                message: "password update success",
                data: updatePass
            })
        }
        throw new Error("invalid creditionals ...")
    }
    catch (err) {
        res.send({
            error: true,
            message: err.message
        })
    }

})

profileRouter.post("/edit-profile-password-by-question", userAuth, async (req, res) => {
    try {
        const { token } = req.cookies
        const decodingObj = await jwt.verify(token, "MySecret@1212")
        const _id = decodingObj._id
        const answer = req.body.answer
        const user = await UserModel.findById(_id)
        const isValisAnswer = answer === user.forgotPasswordQuestionAns
        if (isValisAnswer) {
            const newPassword = req.body.newPassword
            const newHashedPassword = await bcrypt.hash(newPassword, 10)
            const updatePass = await UserModel.findByIdAndUpdate(
                req.user._id,
                { $set: { password: newHashedPassword } },
                { new: true, runValidators: true }
            );
            return res.send({
                error: false,
                message: "password update success",
                data: updatePass
            })
        }
        throw new Error("invalid creditionals ...")
    }

    catch (err) {
        res.send({
            error: true,
            message: err.message
        })
    }

})

module.exports = { profileRouter }