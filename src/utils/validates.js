const validator = require("validator");

const validateUser = (req, res) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("not a valid name first name or last name");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("not a valid Email ID")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("choose Strong Password");
    }
}

module.exports = {
    validateUser
}