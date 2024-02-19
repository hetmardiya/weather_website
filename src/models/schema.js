const { type } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator")

const registration_data = mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address")
            }
        }
    },
    pwd : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
})

const new_data = mongoose.model("users",registration_data);
module.exports = new_data;