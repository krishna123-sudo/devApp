// require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 40
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 40
    },
    age: {
        type: Number,
        min: 18,

    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not a valid gender`
        }
    },
    emailId: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        // required: true,
        minLength: 10,
        maxLength: 10
    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
        default: "this about is default you are a good person",
        set: v => v === "" ? undefined : v
    },
    photoUrl: {
        type: String
    }
}, { timestamps: true, })


userSchema.methods.getJWT = async function () {
    const user = this;
    // console.log(process.env.JWT_SECRET)
    const token = await jwt.sign({ _id: user._id }, `KisKisu@1234567890@@`, {
        expiresIn: "7d"
    })

    return token
}

userSchema.methods.getPasswordValid = async function (passwordByUser) {
    const user = this;

    const isPasswordValid = await bcrypt.compare(passwordByUser, user.password);

    return isPasswordValid;
}


module.exports = mongoose.model("User", userSchema);