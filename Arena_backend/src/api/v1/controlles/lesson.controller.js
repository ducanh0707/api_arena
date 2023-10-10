import db from '../models/index'
import lessonService from "../services/lesson.services"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import user from '../models/user'
import {
    where
} from 'sequelize'
require("dotenv").config()

//create new lesson

let create = async (req, res, next) => {

    let data = req.body
    // check valid
    if (!data.name || !data.desc || !data.key || !data.point || !data.id_course) {
        return res.status(400).json({
            status: 4,
            message: "invalid input datatype",
            data: null

        });
    }
    try {
        const lesson = await lessonService.newLesson(data);
        res.status(201).json(lesson);
        // next()
    } catch (error) {
        res.status(401).json({
            status: 6,
            message: "Internal Server",
            data: null

        });
    }
};

let listLesson = async (req, res, next) => {
    try {
        let data = await lessonService.allLesson(data)
        // next();
        res.status(200).json(data);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}

let updateLesson = async (req, res, next) => {
    try {
        const lessonId = req.params.id;
        const data = req.body;
        let newData = await lessonService.update(lessonId, data)
        // next();
        res.status(200).json(newData);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}

let deleteLesson = async (req, res, next) => {
    try {
        const lessonId = req.params.id;
        let newData = await lessonService.deleteLesson(lessonId)
        // next();

        res.status(200).json(newData);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}

module.exports = {
    create: create,
    listLesson: listLesson,
    updateLesson: updateLesson,
    deleteLesson: deleteLesson
}