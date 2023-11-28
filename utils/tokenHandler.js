const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const accessToken = req.cookies.jwtSecretToken;

    if (!accessToken) return res.status(401).json({
        success: false,
        message: "Unauthorized access attempted"
    });

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.status(403).json({
                success: false,
                message: "Invalid Token"
            });
            req.email = decoded.email;
            next();
        }
    );
};

module.exports = verifyJWT;