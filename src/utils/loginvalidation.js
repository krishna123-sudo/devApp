const validator = require("validator");

const loginValidate = (req, res) => {
    if (!validator.isEmail(req.body.emailId)) {
        throw new Error("Write valid email id")
    }
}

module.exports = {
    loginValidate
}