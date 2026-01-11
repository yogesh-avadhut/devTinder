const express = require("express")
const app = express()

app.use("/home",(req,res)=>{
    res.send("welcome to home")
})

app.use("/profile",(req,res)=>{
    res.send("this is profile page ...")
})

app.use("/feed",(req,res)=>{
    res.send("this is feed page")
})

app.listen(3000,()=>{
    console.log("server is running...")
})
