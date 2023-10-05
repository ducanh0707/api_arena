import jwt from "jsonwebtoken"
import db from "../models/index"
require("dotenv").config()
const Course = db.Course;
let newCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check tồn tại 
            let existingCourse = await Course.findOne({
                where: {
                    name: data.name
                },
                raw: false
            })
            if (!existingCourse) {
                let newCourse = await Course.create({
                    name: data.name,
                    desc: data.desc,
                    status: 1,
                })
                if (newCourse) {
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
            reject(error)
        }
    })
}
let allCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.findAll();
            if (course.length > 0) {
                resolve({
                    status: 0,
                    message: 'Success',
                    data: course
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
let update = (courseId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let course = await Course.findOne({
                where: {
                    id: courseId
                },
                raw: false
            })
            await course.update({
                name: data.name,
                desc: data.desc,
                status: data.status,
            });
            resolve({
                status: 0,
                message: 'Success',
                data: course
            });
        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server"
            })
        }
    })

};
let deleteCourse = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Course.destroy({
                where: {
                    id: courseId
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
    newCourse: newCourse,
    allCourse: allCourse,
    update: update,
    deleteCourse: deleteCourse
}