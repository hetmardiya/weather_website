const { type } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator");
const bcriptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

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
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})
registration_data.methods.generate_token = async function(){
    try {
        const token = jwt.sign({_id : this._id.toString()},process.env.secret_key)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token
    } catch (error) {
        console.log("error from the json web token part");
    }
}

registration_data.pre("save" , async function(next){
    if (this.isModified("pwd")) {
        this.pwd = await bcriptjs.hash(this.pwd,10);
    }
    next();
})
const new_data = mongoose.model("users",registration_data);
module.exports = new_data;