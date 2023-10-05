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
        expiresIn: '1h'
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
        let payload = {
            id: user.id,
            role: user.id_role,
            active: user.status,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        }
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
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await User.findByPk(userId);
            if (user) {
                resolve({
                    status: 0,
                    message: "Success",
                    data: user
                })
            } else {
                resolve({
                    "errorCode": 2,
                    "status": "Data not found"
                })
            }
        } catch (e) {
            logError.logger.error(e, {
                functionName: getProfileById.name
            });
            reject({
                "errorCode": 6,
                "status": "Internal Server"
            })
        }
    })
}


// const getUserById = async (userId) => {
//     try {
//         const user = await User.findByPk(userId);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// };
module.exports = {
    register: register,
    logIn: logIn,
    getUserById: getUserById
}