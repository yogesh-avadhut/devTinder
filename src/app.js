const express = require("express")
const app = express()

const {adminAuth,userAuth} =require("./middleware/auth")

app.get("/admin",adminAuth,(req,res,next)=>{
    res.send("welcome admin, have a good day..")
})

app.get("/user",userAuth,(req,res,next)=>{
    res.send("welcome user have a nice day ...")
})


app.listen(3000, () => {
    console.log("server is running...")
})

