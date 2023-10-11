import express from 'express'
import lessonController from '../controlles/lesson.controller'
import {
  authenticateJWT
} from '../middlewares/isAuthenticate'
import {
  checkAdminAccess
} from '../middlewares/checkAdminAccess'
let router = express.Router()
let initLessonV1 = (app) => {
  router.post("/create", authenticateJWT, checkAdminAccess, lessonController.create);

  router.get("/list", authenticateJWT, checkAdminAccess, lessonController.listLesson);

  router.put("/update/:id", authenticateJWT, checkAdminAccess, lessonController.updateLesson);

  router.delete("/delete/:id", authenticateJWT, checkAdminAccess, lessonController.deleteLesson);



  // Sử dụng middleware authenticateJWT và checkAdminAccess
  // router.get("/test", lessonController.home);

  return app.use('/api/v1/Lesson/', router)
}
module.exports = initLessonV1