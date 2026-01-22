const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: String,
        require: true,
        ref:"User"
    },
    toUserId: {
        type: String,
        require: true,
         ref:"User"
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{value} is incorrect status type`
        } 
    }
},
    {
        timestamps: true
    }
)
const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema)
module.exports =  {ConnectionRequest} 