const mongoose = require("mongoose");

const user_table = new mongoose.Schema({
    username : {type:String,required:true,unique:true},
    password : {type:String,required:true}
});

const user_model = new mongoose.model("users",user_table);
module.exports = user_model;