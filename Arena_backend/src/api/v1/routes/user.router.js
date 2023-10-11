import express from 'express'
import userController from '../controlles/users.controller'
import {
  authenticateJWT
} from '../middlewares/isAuthenticate'
import {
  checkAdminAccess
} from '../middlewares/checkAdminAccess'

let router = express.Router()
let initApiV1 = (app) => {
  router.post("/sign-up", userController.signUp);

  router.post("/sign-in", userController.signIn);

  router.get("/profile/:id", authenticateJWT, userController.profile);

  router.get("/user", authenticateJWT, userController.allUser);

  router.put("/update/:userId", authenticateJWT, userController.update);

  // Sử dụng middleware authenticateJWT và checkAdminAccess
  router.get("/test", userController.home);

  return app.use('/api/v1', router)
}
module.exports = initApiV1