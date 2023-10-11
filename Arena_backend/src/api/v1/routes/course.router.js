import express from 'express'
import courseController from '../controlles/course.controller'
import {
  authenticateJWT
} from '../middlewares/isAuthenticate'
import {
  checkAdminAccess
} from '../middlewares/checkAdminAccess'
let router = express.Router()
let initCourseV1 = (app) => {
  router.post("/create", authenticateJWT, checkAdminAccess, courseController.create);

  router.get("/list", authenticateJWT, checkAdminAccess, courseController.listCourse);

  router.put("/update/:id", authenticateJWT, checkAdminAccess, courseController.updateCourse);

  router.delete("/delete/:id", authenticateJWT, checkAdminAccess, courseController.deleteCourse);



  // Sử dụng middleware authenticateJWT và checkAdminAccess
  // router.get("/test", courseController.home);

  return app.use('/api/v1/Course/', router)
}
module.exports = initCourseV1