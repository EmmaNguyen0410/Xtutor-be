import * as expresss from 'express';
import Controller from './controller';
export default expresss
        .Router()
        .get("/",Controller.get)
        .get("/:id", Controller.findOne)
        .put("/update_reference", Controller.updateReference)
        .put("/update_experience", Controller.updateWorkingExperience)
        .put("/update_teaching_sub", Controller.updateTeachingSub)
        .put("/update_feedback", Controller.updateFeedback)
        .put("/update_free_time/:id", Controller.updateFreeTime)
        .post("/filter", Controller.filter)
