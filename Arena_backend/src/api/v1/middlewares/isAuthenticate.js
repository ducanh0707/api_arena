import jwt from "jsonwebtoken";
import db from "../models/index"

// const User = db.User
require("dotenv").config()

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 5,
            message: "Invalid token"
        });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 5,
                message: "Invalid token"
            });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateJWT: authenticateJWT
};