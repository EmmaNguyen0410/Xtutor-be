import tutorModel from "../../../models/tutor";
import tutor from "../../../models/tutor";

export class Controller {
    get(req, res) {
        tutorModel.find({}, (err, data) => {
            if (err) console.log
            else {
                res.send(data)
            }
        })
    }
    findOne(req, res) {
        console.log('adsfaf')
        const id = req.params.id;
        tutorModel.findById(id)
            .populate('user_id')
            .exec((err, tutor) => {
                if(err) console.log(err)
                else {
                    res.send(tutor)
                    console.log('adsf')
                }
            })
    }
    filter(req, res) {
        const { academic_level, subject, country_name, academic_level_name, gender_name, language_name, nationality_name, academic_grade} = req.body;
        const queryTutor = {};
        const queryUser = {};
        if(academic_grade){
            queryTutor['teaching_subject.academic_grade'] = academic_grade
        }
        if(subject) {
            queryTutor['teaching_subject.subject'] = subject;
        }
        if(academic_level) {
            queryTutor['teaching_subject.academic_level'] = academic_level;
        }
        if(country_name) {
            queryUser['userInfo.profile.country_name'] = country_name;
        }
        if(academic_level_name) {
            queryUser['userInfo.profile.academic_level_name'] = academic_level_name;
        }
        if(gender_name) {
            queryUser['userInfo.profile.gender_name'] = gender_name;
        }
        if(language_name) {
            queryUser['userInfo.profile.language_name'] = language_name;
        }
        if(nationality_name) {
            queryUser['userInfo.profile.nationality_name'] = nationality_name;
        }

        tutorModel.aggregate([
            {
                '$match': queryTutor
            },
            {
				'$lookup': {
					'from': 'users',
					'localField': 'user_id',
					'foreignField': '_id',
					'as': 'userRefs'
				}
            },
            {
                '$addFields': {
                    'userInfo': { '$arrayElemAt': ['$userRefs', 0] }
                }
            },
            {
                '$match': queryUser
            }
        ]).then(tutors => {
            res.send(tutors);
        }).catch(err => {
            console.log(err);
        });
    }
    updateReference(req, res) {
        const { major, institute, certificate, about_me } = req.body;

        tutorModel.findByIdAndUpdate(
            req.body.id,
            { $set: { reference: { about_me, major, institute, certificate } } },
            { new: true },
            (err, updated) => {
                if (err) console.log(err);
                else {
                    console.log('update reference')
                    tutorModel.find({}, (err, tutors) => {
                        if (err) console.log(err)
                        else res.send(tutors)
                    })
                }
            }
        )
    }
    updateFreeTime(req, res) {
        const freeTime = req.body.free_time;
        console.log(freeTime);
        const id = req.params.id;
        tutorModel.findById(id)
            .then((tutorFound) => {
                tutorModel.updateOne(
                    { "_id": id },
                    { free_calendar: freeTime })
                    .then(
                        (update) => {res.send(update)})
            })
            .catch((err) => res.send(err))
    }

    updateWorkingExperience(req, res) {
        const expe_arr = req.body.experiences;
        tutorModel.findByIdAndUpdate(
            req.body.id,
            { $set: { working_experience: expe_arr } },
            { new: true },
            (err, updated) => {
                if (err) console.log(err);
                else {
                    tutorModel.find({}, (err, tutors) => {
                        if (err) console.log(err)
                        else res.send(tutors)
                    })
                }
            }
        )
    }
    updateTeachingSub(req, res) {
        tutorModel.findByIdAndUpdate(
            req.body.id,
            { $set: { teaching_subject: req.body.teaching_subs } },
            { new: true },
            (err, updated) => {
                if (err) console.log(err);
                else {
                    tutorModel.find({"_id": req.body.id}, (err, tutors) => {
                        if (err) console.log(err)
                        else res.send(tutors)
                    })
                }
            }
        )
    }
    updateFeedback(req, res) {
        tutorModel.findByIdAndUpdate(
            req.body.id,
            { $set: { feedback: req.body.feedbacks } },
            { new: true },
            (err, updated) => {
                if (err) console.log(err);
                else {
                    tutorModel.find({}, (err, tutors) => {
                        if (err) console.log(err)
                        else res.send(tutors)
                    })
                }
            }
        )
    }
}

export default new Controller();