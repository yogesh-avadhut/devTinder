const express = require("express")
const app = express()
const connectDb = require("./config/database")
const UserModel = require("./models/user")

app.post("/signup", async (req,res) => {
    user = new UserModel({
    fristName: "yogesh",
    lastName: "avadht",
    city: "barshi"

    })
    await user.save()
    res.send("user added successful...")
})






connectDb()
    .then(() => {
        console.log("connection successful")
        app.listen(3000, () => {
            console.log("server is running...")
        })

    })
    .catch((err) => {
        console.log("error:", err)
    })

