import express from 'express';
import jwt from 'jsonwebtoken'
import userService from "../services/user.services";
require("dotenv").config()

let home = (req, res, next) => {
    res.send("test ok")
}
const isAdminOrSelf = (currentUser, targetUser) => {
    return currentUser.id_role === 'ADMIN' || currentUser.id === targetUser.id;
};
//register
let signUp = async (req, res, next) => {
    // check input

    let data = req.body;
    // console.log(data)
    if (!data.username || !data.email || !data.password) {
        return res.status(400).json({
            status: 4,
            message: "invalid input datatype",
        });
    }
    try {
        const newUser = await userService.register(data);
        res.status(201).json(newUser);
        next();
    } catch (error) {
        res.status(400).json({
            message: error
        });
        // return error
    }
};
let signIn = async (req, res, next) => {

    let data = req.body
    // check valid
    if (!data.email || !data.password) {
        return res.status(400).json({
            status: 4,
            message: "invalid input datatype",
        });
    }
    try {
        const {
            user,
            token
        } = await userService.logIn(data);
        next()
        res.status(200).json({
            user,
            token
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};
//get by Id
let profile = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const valueUser = req.user
        // console.log(valueUser)
        const user = await userService.getUserById(id);
        if (user || valueUser.id_role == 0) {
            return res.status(200).json(user);
        }
        next();
        if (!user || valueUser.id != id) {
            return res.status(404).json({
                status: 2,
                message: "Data not found"
            });
        }
        next();
        return res.status(200).json(user);
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        });
    }
}
//all user
let allUser = async (req, res, next) => {
    try {
        const valueUser = req.user
        // console.log(valueUser.id_role)
        // console.log(valueUser.id)
        if (valueUser.id_role === 0 && valueUser.id === 1) {
            let data = await userService.allUser(data)
            next();
            return res.status(200).json(data);
        } else {
            return res.status(400).json({
                status: 6,
                message: "Internal Server"
            });
        }
    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}
// updata
let update = async (req, res) => {
    const userId = req.params.userId;
    const newData = req.body;
    const value = req.user;

    try {
        if (value.id == userId || value.id_role == 0) {
            const result = await userService.userUpdate(userId, newData);
            return res.json(result);
        }
        return res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        });
    }
};
module.exports = {
    signUp: signUp,
    signIn: signIn,
    profile: profile,
    allUser: allUser,
    update: update,
    home: home
}