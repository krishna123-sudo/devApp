const mongoose = require("mongoose");

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
        enum: ["male", "female", "others"]
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10
    },
    skills: {
        type: String
    },
    about: {
        type: String,
        default: "this about is default you are a good person",
        set: v => v === "" ? undefined : v
    }
})

module.exports = mongoose.model("User", userSchema);