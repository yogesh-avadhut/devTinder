const express = require("express")
const connectRequestRouter = express.Router()


connectRequestRouter.get('/send-connection-request',(req,res)=>{
    const user = req.user
    console.log("send connection reqest ")

    res.send({
        error: false,
        data:user
    })
})


module.exports = {connectRequestRouter}