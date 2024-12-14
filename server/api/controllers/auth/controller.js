import userModel from "../../models/user";
import tutorModel from "../../models/tutor";
import stdModel from "../../models/student";
import DisabledTokenModel from '../../models/disabled_token'
const jwt = require('../../../../node_modules/jsonwebtoken');
const jwt_decode = require('jwt-decode');


export class Controller {
    login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).send({ success: 0, message: "Missing email or password" })
        } else {
            userModel.findOne({ account: { email, password } })
                .then((userFound) => {
                    if (!userFound) res.status(404).send({ success: 0, message: "Wrong email or password" });
                    else {
                        if (password != userFound.account.password) res.status(40).send({ success: 0, message: "Wrong password" })
                        else {
                            const payload = {
                                email: email,
                                password: password
                            }
                            const token = jwt.sign(payload, process.env.SECRET_KEY);
                            if (userFound.role === "student") {
                                stdModel.findOne({ "user_id": userFound._id }).populate("user_id").then((studentFound) => {
                                    const sent_data = {
                                        token: token,
                                        userInfo: studentFound
                                    }
                                    console.log(sent_data);
                                    res.send(sent_data);
                                });
                            } else if(userFound.role === "tutor") {
                                tutorModel.findOne({ "user_id": userFound._id }).populate("user_id").then((tutorFound) => {
                                    console.log(tutorFound)
                                    const sent_data = {
                                        token: token,
                                        userInfo: tutorFound
                                    }
                                    console.log(tutorFound);
                                    console.log(sent_data);
                                    res.send(sent_data);
                                });
                            }else{
                                console.log("fail")
                                res.send("fail")
                            }
                            
                        }
                    }
                })
        }
    }
    checkToken(req, res) {
        const sent_token = req.query;
        const decoded = jwt_decode(sent_token);
    }

    register(req, res) {
        const { role, first_name, last_name, email, password, phone_num, gender_name, profile_picture } = req.body;
        userModel.find({'account.email': email}, (err, data) =>{
            console.log(data.length)
            if(data.length > 0){
                console.log("existing email",data)
                res.send({success: 0, message: "User existed"})
            }else{
                console.log("tao moi")
                userModel.create(
                    {
                        profile: { last_name: last_name, first_name: first_name, gender_name: gender_name, phone_number: phone_num, profile_picture: profile_picture },
                        account: { email: email, password: password },
                        role: role
                    },
                    (err, user) => {
                        if(err) console.log(err)
                        else{
                            if(role === "tutor"){
                                tutorModel.create({user_id: user._id}, (err, tutor) => {
                                    if(err) console.log(err)
                                    else {
                                        console.log(tutor)
                                        res.send({success: 1, tutor: tutor})
                                    }
                                })
                            }else if(role === "student"){
                                stdModel.create({user_id: user._id}, (err, student) => {
                                    if(err) console.log(err)
                                    else{
                                        console.log(student)
                                        res.send({success: 1, student: student})
                                    }
                                }) 
                            }else{
                                res.send({success: 0})
                            }
                        }
                    }
                )
            }
        })
    }

    logout(req, res) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        DisabledTokenModel.create({ disabled_token: token });

        res.send("logged out")
    }
}

export default new Controller();