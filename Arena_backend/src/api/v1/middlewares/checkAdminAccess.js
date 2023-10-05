import jwt from "jsonwebtoken";
require("dotenv").config()

const checkAdminAccess = (req, res, next) => {
    // console.log(req.user.id_role)
    if (req.user && req.user.id_role == '0') {
        // Người dùng có quyền admin, cho phép tiếp tục
        next();
    } else {
        // Người dùng không có quyền admin, từ chối truy cập
        res.status(403).json({
            message: 'Không có quyền truy cập'
        });
    }
};
module.exports = {
    checkAdminAccess: checkAdminAccess
}