const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
{
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  mobile: {
    type: String,
    max:10
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"]
  },

  age: {
    type: Number,
    min: 18,
    max: 100
  },

  city: {
    type: String,
    trim: true
  },

  photo: {
    type: String
  }
},
{
  timestamps: true
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel
