import userModel from "../../models/user";
export class Controller{
    updateProfile(req,res){
        const updateInfo = req.body
        userModel.findByIdAndUpdate(updateInfo.id,
            {$set : {
                profile: {
                    academic_level_name: updateInfo.academic_level_name,
                    account_number: updateInfo.account_number,
                    address: updateInfo.address,
                    bank_name: updateInfo.bank_name,
                    date_of_birth: updateInfo.date_of_birth,
                    first_name: updateInfo.first_name,
                    gender_name: updateInfo.gender_name,
                    last_name: updateInfo.last_name,
                    //country: updateInfo.country,
                    country_name: updateInfo.country_name,
                    language_name: updateInfo.language_name,
                    //language_user: updateInfo.language_user,
                    city_name: updateInfo.city_name,
                    //religion_name: updateInfo.religion_name,
                    nationality_name: updateInfo.nationality_name,
                    no_passport: updateInfo.no_passport,
                    //other_name: updateInfo.other_name,
                    postal_code: updateInfo.postal_code,
                    profile_picture: updateInfo.profile_picture,
                    payment_method:updateInfo.payment_method,
                    paypal_email: updateInfo.paypal_email,
                    phone_code: updateInfo.phone_code,
                    phone_number:updateInfo.phone_number,
                    //race_name: updateInfo.postal_coderace_name,
                },
            }}, { new: true })
            .then((data) => {
                // De new: true thi data nay moi la data moi, con khong thi no la data truoc khi update
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}
export default new Controller();