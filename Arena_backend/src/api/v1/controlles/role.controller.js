import roleController from "../services/role.services";
require("dotenv").config()

let create = async (req, res, next) => {

    let data = req.body
    // check valid
    if (!data.name) {
        return res.status(400).json({
            status: 4,
            message: "invalid input datatype",
        });
    }
    try {
        const role = await roleController.newRole(data);
        // next()
        res.status(201).json(role);
    } catch (error) {
        res.status(401).json({
            status: 6,
            message: "Internal Server"
        });
    }
};

let listRole = async (req, res, next) => {
    try {
        let data = await roleController.allRole(data)
        // next();
        res.status(200).json(data);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}

let updateRole = async (req, res, next) => {
    try {
        const roleId = req.params.id;
        const data = req.body;
        let newData = await roleController.update(roleId, data)
        // next();
        res.status(200).json(newData);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server"
        })
    }
}

let deleterole = async (req, res, next) => {
    try {
        const roleId = req.params.id;
        let newData = await roleController.deleteRole(roleId)
        // next();

        res.status(200).json(newData);

    } catch (e) {
        res.status(500).json({
            status: 6,
            message: "Internal Server1"
        })
    }
}
let home = (req, res, next) => {
    res.send("test ok")
}
module.exports = {
    home: home,
    create: create,
    listRole: listRole,
    updateRole: updateRole,
    deleterole: deleterole
}