const mongoose = require("../../../node_modules/mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = new Schema({
    account : {
        email:{type:String, require:true},
        password:{type:String, require:true}
    },
    role : {type:String, require: true},
    profile:{
        academic_level_name: {type:String},
        account_number: {type:Number},
        address: {type:String},
        bank_name: {type:String},
        date_of_birth: {type:String},
        first_name: {type: String, require:true},
        gender_name: {type:String, require:true},
        last_name: {type: String, require:true},
        country_name: {type:String},
        language_name: {type:String},
        city_name: {type:String},
        nationality_name: {type:String},
        no_passport: {type:Number},
        postal_code: {type:String},
        profile_picture: {type:String},
        payment_method: {type: String},
        paypal_email: {type:String},
        phone_code: {type:Number},
        phone_number: {type:Number},
    }
})

export default Model("user", UserSchema);