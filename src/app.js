const express = require("express")
const app = express()
const connectDb = require("./config/database")
const UserModel = require("./models/user")

app.use(express.json())


app.post("/signup", async (req, res) => {

    const user = new UserModel(req.body)
    try {
        await user.save()
        res.send({
            message: "user successfully added :)",
            user: req.body
        })
    }
    catch (err) {
        res.send({
            message: "error come user are not created :(",
            error: err.message
        })

    }
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

