import express from "express";
import bodyParser from "body-parser";
import initApiV1 from "./src/api/v1/routes/user.router";
import initRoleV1 from "./src/api/v1/routes/role.router";
import initCourseV1 from "./src/api/v1/routes/course.router";
import initLessonV1 from "./src/api/v1/routes/lesson.router";
import connectDB from "./src/config/connectDB";
import cors from "cors";
import cookieParser from 'cookie-parser'

import configsViewEngine from './src/config/configView';
require("dotenv").config();
let app = express();
app.use(bodyParser.json());
app.use(cors({
    credentials: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
initApiV1(app);
initRoleV1(app);
initCourseV1(app);
initLessonV1(app);
configsViewEngine(app)
connectDB();

const port = process.env.PORT || 3001;
const ip = '0.0.0.0'

app.listen(port, ip, () => {
    console.log(`Backend Nodejs is running on the port : ` + port);
});