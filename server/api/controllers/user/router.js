import * as express from 'express';
import controller from './controller';
import tutorRouter from './tutor/router';
import studentRouter from './student/router';
const jwt = require("jsonwebtoken");

export default express
    .Router()
    .use("/tutor",tutorRouter)
    .use("/student",studentRouter)
    .put("/",controller.updateProfile)
