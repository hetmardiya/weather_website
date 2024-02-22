const jwt = require("jsonwebtoken")
const new_data = require("../models/schema")

const auth = async (req,res,next)=>{
    try {
        const token = req.cookies.website;
        const verify = jwt.verify(token , process.env.secret_key)
        
        const user = await new_data.findOne({_id : verify})
        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth;