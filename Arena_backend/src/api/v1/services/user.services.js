// const {
//     User
// } = require("../models/User")
import db from "../models/index"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const salt = bcrypt.genSaltSync(10);
require("dotenv").config()
const User = db.User

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

async function checkUserExists(email) {
    const existingUser = await User.findOne({
        where: {
            email
        },
        raw: true
    });
    return existingUser;
}
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let passwordhash = bcrypt.hashSync(password, salt)
            resolve(passwordhash)
        } catch (e) {
            reject(e);
        }

    })

}

let register = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!isValidEmail(data.email)) {
                resolve({
                    status: 4,
                    message: "invalid input datatype",
                })
            }
            // check user tồn tại 
            let existingUser = await User.findOne({
                // attributes: ['id', 'username', 'email', 'password', 'id_role', 'id_organization', 'status', 'totalPass', 'createdAt', 'updatedAt'],
                where: {
                    email: data.email
                },
                raw: false
            })
            let passwordhash = await hashPassword(data.password)
            if (!existingUser) {
                let newUser = await db.User.create({
                    username: data.username,
                    email: data.email,
                    id_role: 1,
                    id_organization: 0,
                    status: 1,
                    totalPass: 0,
                    password: passwordhash
                })
                if (newUser) {
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

const generateJWTToken = (userId, idRole, status) => {
    return jwt.sign({
        id: userId,
        id_role: idRole,
        status: status,
    }, process.env.SECRET_KEY, {
        expiresIn: "2h"
    });
};
// logIn
let logIn = async (data) => {
    try {
        const user = await User.findOne({
            where: {
                // attributes: ['id', 'username', 'email', 'password', 'id_role', 'id_organization', 'status', 'totalPass', 'createdAt', 'updatedAt'],
                email: data.email
            },
            raw: false

        });


        if (!user || user.status == '0') {
            throw new Error('Tài khoản không tồn tại');
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Mật khẩu không đúng');
        }

        const token = generateJWTToken(user.id, user.id_role, user.status);
        return {
            user,
            token
        };
    } catch (error) {
        throw error;
    }
};
// getbyID
let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByPk(id)
            // console.log(req.user)

            if (user) {
                resolve({
                    status: 0,
                    message: "Success1",
                    data: user
                })
            } else {
                resolve({
                    status: 2,
                    message: "Data not found2"
                })
            }
        } catch (e) {
            // logError.logger.error(e, {
            //     functionName: getProfileById.name
            // });
            reject({
                status: 6,
                message: "Internal Server"
            })
        }
    })
}
let allUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            const users = await db.User.findAll();
            if (users.length > 0) {
                // const userData = users.filter(user => user.role !== 'admin').map(user => ({
                //     id: user.id,
                //     userName: user.userName,
                //     email: user.email,
                //     totalPass: user.totalPass
                // }));
                resolve({
                    status: 0,
                    message: 'Success',
                    data: users
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
let userUpdate = async (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: false
            })
            let passwordhash = await hashPassword(data.password)
            await user.update({
                username: data.username,
                email: data.email,
                status: data.status,
                password: passwordhash,
            });
            resolve({
                status: 0,
                message: 'Thông tin người dùng đã được cập nhật thành công',
                data: user
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
    register: register,
    logIn: logIn,
    getUserById: getUserById,
    allUser: allUser,
    userUpdate: userUpdate
}