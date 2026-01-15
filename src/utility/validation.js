const validator = require("validator")

function validateSignupData(req) {
    const { firstName,
        lastName,
        emailId,
        password } = req.body
    if (!firstName || !lastName) {
        throw new Error("name shuld be reqoured!")
    }
        else if (!emailId) {
        throw new Error("email required!")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("enter a valid email!")
    }
        else if (!password) {
        throw new Error("password required !")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("weak password make a strong password!")
    }
}

module.exports = {validateSignupData}