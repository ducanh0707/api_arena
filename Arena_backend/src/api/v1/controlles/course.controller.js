import db from '../models/index'
import courseController from "../services/course.services"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import user from '../models/user'
import {
    where
} from 'sequelize'
require("dotenv").config()

//create new course 

let create = async (req, res, next) => {

    let data = req.body
    // check valid
    if (!data.name || !data.desc) {
        return res.status(400).json({
            status: 4,
            message: "invalid input datatype",
        });
    }
    try {
        const course = await courseController.newCourse(data);
        res.status(201).json(course);
        next()
    } catch (error) {
        res.status(401).json({
            status: 6,
            message: "Internal Server"
        });
    }
};

let listCourse = async (req, res, next) => {
    try {
        let data = await courseController.allCourse(data)
        next();
        res.status(200).json(data);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}

let updateCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const data = req.body;
        let newData = await courseController.update(courseId, data)
        next();
        res.status(200).json(newData);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}

let deleteCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        let newData = await courseController.deleteCourse(courseId)
        next();

        return res.status(200).json(newData);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}

module.exports = {
    create: create,
    listCourse: listCourse,
    updateCourse: updateCourse,
    deleteCourse: deleteCourse
}