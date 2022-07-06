const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//create express app
const app = express();
app.use(cors());

app.use(morgan('dev'));
//parse application 
app.use(bodyParser.urlencoded({extended:true}));

//parse application/json
app.use(bodyParser.json());

//configuring the database
const dbconfig =require("./config/database.config.js");const mongoose =require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(dbconfig.url,{
    useNewUrlParser:true,
}).then(()=>{
    console.log("Successfully connected to the database");
}).catch((err)=>{
    console.log("Could not connect to the database. Existing now...",err);
    process.exit();
})

app.get("/",(req,res)=>{
    res.json({massage:"Welcome to My API"});
});


//listen to requests
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});
