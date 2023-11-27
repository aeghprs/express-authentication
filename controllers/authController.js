const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");

const handleNewUser = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !password || !email) return res.status(400).json({
        "success": false,
        "message": "All the fields above are required"
    });

    const duplicateEmail = await User.findOne({ email: email });

    if (duplicateEmail) return res.status(400).json({
        "success": false,
        "message": "Email already exists"
    });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ userName, email, hashedPassword });
        res.status(201).json({
            "success": true,
            "message": "New user created!"
        });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
};


const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({
        "success": false,
        "message": "Email and Password are required."
    });

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) return res.status(401).json({
        "success": false,
        "message": "User does not exists. Please try again."
    });


    const matchPassword = await bcrypt.compare(password, foundUser.hashedPassword);

    if (matchPassword) {
        res.status(200).json({
            "success": true,
            "message": "User found",
            "userName": foundUser.userName,
            "email": foundUser.email
        });
    } else {
        res.status(401).json({
            "success": false,
            "message": "Incorrect Password. Please enter password again",
        });
    }
};

module.exports = { handleNewUser, handleUserLogin };