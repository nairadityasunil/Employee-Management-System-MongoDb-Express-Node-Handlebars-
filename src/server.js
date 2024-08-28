// Including necessary files 
// TO run server -> npm run dev
require("./database/db_connection"); // Database connection file
const { authenticate } = require('./controllers/user_controller');
const e_router = require("./routes/emp_routes"); // Employee Routes
const u_router = require("./routes/user_routes"); // User Routes

// Importing dependencies
const express = require("express");
const app = express();
const hbs = require("hbs");
const body_parser = require("body-parser");
const path = require("path");

const port = 3000; // Port number for the application
app.use(body_parser.urlencoded({ extended: true }));

// Configuring paths to necessary folders
const views_path = path.join(__dirname,"../templates/views"); // Path to the view folder
app.set("view engine","hbs"); // Setting View Engine
app.set("views",views_path); // Setting path to views folder
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

// Middlewares
app.use('/emp',e_router); // Middleware for employee section
app.use('/user',u_router); // Middlewares for user master

// Login Routes
app.get('/', (req,res) => {
    res.render('login');
});
app.post('/authenticate' ,authenticate);


app.listen(port,()=>{
    console.log("Employee Management System Server running at port : "+port);
});