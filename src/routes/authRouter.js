const express = require("express")
const { validateSignupData } = require("../utility/validation")
const UserModel = require("../models/user")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

authRouter.post("/signup", async (req, res) => {
    try {
        //validation before creating user 
        validateSignupData(req)

        const { firstName, lastName, emailId, password } = req.body
        console.log(firstName, lastName, emailId, password)
        //password hashing/encrypting
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)

        //creating new record
        const createUser = new UserModel({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        console.log(createUser)

        await createUser.save()
        res.send({
            message: "user successfully added :)",
            user: req.body
        })
    }
    catch (err) {
        res.send({
            error: true,
            message: ("error come user are not created :(" + err.message)
        })
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await UserModel.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid creditionals !")
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (isValidPassword) {
            //create a jwt token 
            const token = await jwt.sign({ _id: user._id }, "MySecret@1212")
            //send the cookie
            res.cookie("token", token)
            res.send("login successful ...")
        } else {
            throw new Error("Invalid creditionals !")
        }
    }
    catch (err) {
        res.status(400).send("error:" + err.message)
    }
})


module.exports = authRouter;