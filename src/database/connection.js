const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/weather_website").then(()=>{
    console.log(`connection successfully from connection.js file for the database`);
}).catch((e)=>{
    console.log(`error from the connection.js file ${e}`);
})