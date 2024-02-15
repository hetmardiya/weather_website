// require npm
const express = require("express");
const app = express();
const path = require("path");
const connection = require("./database/connection");
const hbs = require("hbs");
const port = process.env.PORT || 5000

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

app.get("/", (req,res) =>{
    
    res.render("index")
})
 
app.listen(port,()=>{
    console.log(`listing to port no ${port} from app.js file`);
})