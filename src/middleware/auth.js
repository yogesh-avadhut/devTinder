const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")

async function userAuth(req, res, next) {
    try {
        //read cookies
        const { token } = req.cookies
        //auth token 
        const decodingObj = await jwt.verify(token, "MySecret@1212")
        const _id = decodingObj._id
        //search user 
        const user = await UserModel.findById(_id)
        if (!user) {
            throw new Error("user not found ...")
        }
        req.user = user
        next()
    }
    catch (err) {
        res.send({
            error: true,
            message: err.message
        })
    }
}
module.exports = { userAuth }