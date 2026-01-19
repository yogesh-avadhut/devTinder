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
function validateEditProfileData(req) {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "mobile",
        "gender",
        "age",
        "city",
        "photo",
        "forgotPasswordQuestionAns"
    ];

    const isAllowedEditFields = Object.keys(req.body).every((field) => 
        allowedEditFields.includes(field)
    );

    // console.log(isAllowedEditFields);
    return isAllowedEditFields;
}


module.exports = { validateSignupData, validateEditProfileData }