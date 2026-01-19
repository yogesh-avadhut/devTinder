const express = require("express")
const { userAuth } = require("../middleware/auth")
const { validateEditProfileData } = require("../utility/validation")
const UserModel = require("../models/user")
const profileRouter = express.Router()


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

module.exports = { profileRouter }