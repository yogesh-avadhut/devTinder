
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fristName: {
        type: String
    },
    lastName: {
        type: String
    },
    city: {
        type: String
    }
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel