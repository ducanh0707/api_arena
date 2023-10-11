import express from 'express'
import roleController from '../controlles/role.controller'
import {
  authenticateJWT
} from '../middlewares/isAuthenticate'
import {
  checkAdminAccess
} from '../middlewares/checkAdminAccess'
let router = express.Router()
let initRoleV1 = (app) => {
  router.post("/create", authenticateJWT, checkAdminAccess, roleController.create);

  router.get("/list", authenticateJWT, checkAdminAccess, roleController.listRole);

  router.put("/update/:id", authenticateJWT, checkAdminAccess, roleController.updateRole);

  router.delete("/delete/:id", authenticateJWT, checkAdminAccess, roleController.deleterole);



  // Sử dụng middleware authenticateJWT và checkAdminAccess
  router.get("/test", authenticateJWT, checkAdminAccess, roleController.home);

  return app.use('/api/v1/role/', router)
}
module.exports = initRoleV1