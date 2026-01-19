const express = require("express")
const app = express()
const connectDb = require("./config/database")
const UserModel = require("./models/user")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/authRouter")
const { profileRouter } = require("./routes/profileRouter")
const { connectRequestRouter } = require("./routes/connectionRequestouter")


app.use(express.json())
app.use(cookieParser())

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',connectRequestRouter)


app.get('/user', async (req, res) => {
    try {
        const users = await UserModel.find({})
        if (users.length === 0) {
            res.send({
                error: false,
                message: "users are not found ..."
            })
        } else {
            res.send({
                error: false,
                message: "users fetched successfully",
                users: users
            })
        }
    }
    catch (err) {
        res.send({
            error: true,
            message: ("somthing went wrong :(", err.message)
        })
    }
})

app.patch("/user/:userId", async (req, res) => {
    const data = req.body
    const userId = req.params.userId
    console.log(data, userId)
    try {
        const allowedFieldsToUpdate = ["firstName", "lastName", "gender", "age", "city", "photo"]
        const isObjectAllowed = Object.keys(data).every((k) =>
            allowedFieldsToUpdate.includes(k)
        )
        if (!isObjectAllowed) {
            throw new Error("update not allowed ...")
        }

        const updateUser = await UserModel.findByIdAndUpdate(userId, data, { new: false, runValidators: true })
        console.log(updateUser)
        res.send({
            error: false,
            message: "update successful :)",
            from: updateUser,
            to: data
        })
    }
    catch (err) {
        res.send({
            error: true,
            message: ("update unsuccessful :(", err.message)
        })
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId
    try {
        const deleteUser = await UserModel.findByIdAndDelete(userId)
        if (deleteUser === null) {
            res.send({
                error: "false",
                message: "record not deleted plese check userId",
                recordId: userId
            })
        }
        else {
            res.send({
                error: "false",
                message: "record deleted successfully",
                recordId: userId
            })
        }
    }

    catch (err) {
        res.status(500).send({
            error: true,
            message: err.message
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

