import studentModel from "../../../models/student";

export class Controller {
    getOne(req,res){
        const id = req.params.id;
        studentModel.findById(id)
            .populate('user_id')
            .exec((err,student) => {
                if(err) res.send(err)
                else res.send(student)
            })
    }
}
export default new Controller;