import userModel from "../../models/user";
import tutorModel from "../../models/tutor";
import stdModel from "../../models/student";
import classModel from "../../models/class";
import tutor from "../../models/tutor";


export class Controller {
    getOne(req, res) {
        const id = req.params.id;
        classModel.findById(id)
            .populate('tutor_id')
            .populate('student_id')
            .exec((err, classFound) => {
                if (err) res.send(err)
                else res.send(classFound)
            })
    }
    cancelClass(req, res) {
        const id = req.params.id;
        classModel.findByIdAndDelete(id)
            .then((err, data) => {
                console.log('delete')
                console.log(data)
            })
            .catch((err) => {
                res.send(err);
            });
    }
    bookClass(req, res) {
        const { tutor_id, hourly_rate, student_id, subject, sessions } = req.body;
        console.log('chayj vao bookclass')

        classModel.create({ tutor_id, hourly_rate, student_id, subject, sessions }, (err, newClass) => {
            if (err) console.log(err);
            else {
                res.send(newClass);
                console.log(newClass)
            }
        })
    }
    findStdBookedClass(req, res) {
        classModel.find(
            { "student_id": req.params.student_id })
        .then((classesFound) => 
            {
                res.send(classesFound)
            })
        .catch( err => res.send(err))
    }
    findTutorClass(req, res) {
        classModel.find(
            { "tutor_id": req.params.tutor_id })
        .then((classesFound) => 
            {
                res.send(classesFound)
            })
        .catch( err => res.send(err))
    }
    showTutorCalendar(req, res) {
        let calendar = [];
        classModel.find({ "tutor_id": req.params.tutor_id })
            .then((allClasses) => {
                for (let i = 0; i < allClasses.length; i++) {
                    for (let j = 0; j < allClasses[i].sessions.length; j++) {
                        allClasses[i].sessions[j].title = allClasses[i].subject;       
                    }
                    calendar = calendar.concat(allClasses[i].sessions);
                }
            }
            )
            .catch((err) => res.send(err));
        tutorModel.findById(req.params.tutor_id)
            .then((tutor) => {
                calendar = calendar.concat(tutor.free_calendar);
                console.log(calendar);
                res.send(calendar);
            })
            .catch((err) => {
                res.send(err)
            })

    }
}
export default new Controller();
