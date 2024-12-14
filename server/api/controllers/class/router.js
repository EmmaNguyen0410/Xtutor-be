import Controller from './controller';
import * as express from 'express';

export default express
                .Router()
                .post("/", Controller.bookClass)
                .get('/:id', Controller.getOne)
                .delete('/:id',Controller.cancelClass)
                .get("/tutor/:tutor_id", Controller.showTutorCalendar)
                .get("/tutor/all/:tutor_id",Controller.findTutorClass)
                .get("/student/:student_id", Controller.findStdBookedClass)
