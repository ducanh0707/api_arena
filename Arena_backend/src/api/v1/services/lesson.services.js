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
                attributes: ['name'],
                raw: false
            })
            if (!lesson) {
                let newLesson = await db.Lesson.create({
                    name: data.name,
                    desc: data.desc,
                    key: data.key,
                    point: data.point,
                    id_course: data.id_course,
                    status: 1,
                })
                if (newLesson) {
                    resolve({
                        status: 0,
                        message: "Success"
                    })
                } else {
                    resolve({
                        status: 1,
                        message: "Fail"
                    })
                }
            } else {
                resolve({
                    status: 1,
                    message: "Fail"
                })
            }
        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server",
                message: error.message
            })
        }
    })
}
let allLesson = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)

            let lesson = await db.Lesson.findAll();
            console.log(1)
            if (lesson.length > 0) {
                resolve({
                    status: 0,
                    message: 'Success',
                    data: lesson
                });
            } else {
                resolve({
                    status: 2,
                    message: "Data not found"
                })
            }

        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server"
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
                raw: false
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
                message: "Internal Server"
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
                raw: false
            });
            resolve({
                status: 0,
                message: 'Success',
            });
        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server"
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