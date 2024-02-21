// require npm
const express = require("express");
const app = express();
const path = require("path");
const connection = require("./database/connection");
const new_data = require("./models/schema")
const hbs = require("hbs");
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const bcriptjs = require("bcryptjs")

// static file of css file in public folder
const css_img_file_path = path.join(__dirname , "../public")

app.use(express.static(css_img_file_path))

// path for use templates folder's partial and views
const partials_path = path.join(__dirname , "../templates/partials")
const views_path = path.join(__dirname , "../templates/views")
app.set("view engine" , "hbs");
app.set("views" , views_path);
hbs.registerPartials(partials_path);

// for use bootstrap and jquery npm dynamically
app.use('/bootstrap_css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'), { 'extensions': ['css'] }));
app.use('/bootstrap_js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js'), { 'extensions': ['js'] }));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist'), { 'extensions': ['js'] }));

app.use(express.urlencoded({extended:false}))

app.get("/welcome", (req,res) =>{
    res.render("index")
})
app.get("/details", (req,res) =>{
    res.render("details")
})
app.get("/sign_in", (req,res) =>{
    res.render("sign_in")
})
app.post("/sign_in" , async (req,res)=>{
    try {
        const signin_email = req.body.login_email;
        const signin_pwd = req.body.login_pwd;
        const user_email=await new_data.findOne({email:signin_email})
        const hash_pwd = await bcriptjs.compare(signin_pwd,user_email.pwd)
        if (hash_pwd) {
            res.render("index")
        } else {
            res.send("password is not matching")
        }
    } catch (error) {
        res.status(500).send(error);
    }
})
app.get("/registration", (req,res) =>{
    res.render("registration")
}) 
app.post("/registration" , async (req,res) =>{
    try {
        // res.send(req.body);
        const user_data = new new_data(req.body)
        await user_data.save();
        res.status(200).render("index")
    } catch (error) {
        res.status(500).send(error)
    }
})
app.get("/weather", (req,res) =>{
    res.render("weather")
})

app.listen(port,()=>{
    console.log(`listing to port no ${port} from app.js file`);
})