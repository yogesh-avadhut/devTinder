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
            error: true,
            message: ("error come user are not created :(", err.meassage)
        })
    }
})

app.get('/user', async (req, res) => {

    try {
        const users = await UserModel.find({})
        res.send(users)
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
    userId = req.body.userId
    try {
        const deleteUser = await UserModel.findByIdAndDelete(userId)
        if (deleteUser === null) {
            res.send({
                error: "false",
                meassage: "record not deleted plese check userId",
                recordId: userId
            })
        }
        else {
            res.send({
                error: "false",
                meassage: "record deleted successfully",
                recordId: userId
            })
        }
    }

    catch (err) {
        console.log("error comes :(", err)
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

