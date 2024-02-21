const { type } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator")
const bcriptjs = require("bcryptjs")

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
registration_data.pre("save" , async function(next){
    if (this.isModified("pwd")) {
        this.pwd = await bcriptjs.hash(this.pwd,10);
    }
    next();
})
const new_data = mongoose.model("users",registration_data);
module.exports = new_data;