const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter a Username"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email address"]
    },
    hashedPassword: {
        type: String,
        required: [true, "Please enter a Password"],
        minlength: [7, "Please enter password with 7 minimum characters"],
    }
});

const User = mongoose.model("express-auth-users", userSchema);

module.exports = User;