import db from "../models/index"
import jwt from 'jsonwebtoken'
require("dotenv").config()
const Role = db.Role

let newRole = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check role tồn tại 
            let existingRole = await Role.findOne({
                where: {
                    name: data.name
                },
                raw: false
            })
            if (!existingRole) {
                let newRole = await db.Role.create({
                    name: data.name,
                    status: 1,
                })
                if (newRole) {
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
let allRole = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(data)
            const roles = await Role.findAll();
            if (roles.length > 0) {
                resolve({
                    status: 0,
                    message: 'Success',
                    data: roles
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
let update = (roleId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let role = await Role.findOne({
                where: {
                    id: roleId
                },
                raw: false
            })
            await role.update({
                name: data.name,
                status: data.status,
            });
            resolve({
                status: 0,
                message: 'Success',
                data: role
            });
        } catch (error) {
            reject({
                status: 6,
                message: "Internal Server"
            })
        }
    })

};
let deleteRole = (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Role.destroy({
                where: {
                    id: roleId
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
    newRole: newRole,
    allRole: allRole,
    update: update,
    deleteRole: deleteRole
}