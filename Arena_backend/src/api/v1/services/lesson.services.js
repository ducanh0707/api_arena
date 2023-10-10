import jwt from "jsonwebtoken"
import db from "../models/index"
require("dotenv").config()
const Lesson = db.Lesson;
let newLesson = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check tồn tại 
            let lesson = await Lesson.findOne({
                where: {
                    name: data.name
                },
                // attributes: ['name'],
                raw: true
            })
            if (!lesson) {
                let newLesson = await db.Lesson.create({
                    name: data.name,
                    desc: data.desc,
                    key: data.key,
                    point: data.point,
                    id_course: data.id_course,
                    // CourseId: lesson.id,
                    status: 1,
                })
                if (newLesson) {
                    resolve({
                        status: 0,
                        message: "Success",
                        data: newLesson
                    })
                } else {
                    resolve({
                        status: 1,
                        message: "Fail",
                        data: null

                    })
                }
            } else {
                resolve({
                    status: 1,
                    message: "Fail",
                    data: null

                })
            }
        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server",
                data: null

            })
        }
    })
}
let allLesson = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lesson = await db.Lesson.findAll();
            if (lesson.length > 0) {
                resolve({
                    status: 0,
                    message: 'Success',
                    data: lesson
                });
            } else {
                resolve({
                    status: 2,
                    message: "Data not found",
                    data: null

                })
            }

        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server",
                data: null

            })
        }
    });
}
let update = (lessonId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lesson = await Lesson.findOne({
                where: {
                    id: lessonId
                },
                raw: true
            })
            await lesson.update({
                name: data.name,
                desc: data.desc,
                status: data.status,
            });
            resolve({
                status: 0,
                message: 'Success',
                data: lesson
            });
        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server",
                data: null

            })
        }
    })

};
let deleteLesson = (lessonId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Lesson.destroy({
                where: {
                    id: lessonId
                },
                raw: true
            });
            resolve({
                status: 0,
                message: 'Success',
            });
        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server",
                data: null

            })
        }
    })

};
module.exports = {
    newLesson: newLesson,
    allLesson: allLesson,
    update: update,
    deleteLesson: deleteLesson
}