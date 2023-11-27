const mongoose = require("mongoose");
const { isEmail, isLowerCase } = require("validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a Username"],
        unique: false,
        validate: [isLowerCase, "Please enter username in Lowercase"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter a Password"],
        minlength: [7, "Please enter password with 7 minimum characters"],
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;