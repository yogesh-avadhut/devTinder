const express = require("express")
const { userAuth } = require("../middleware/auth")
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


module.exports = {profileRouter}