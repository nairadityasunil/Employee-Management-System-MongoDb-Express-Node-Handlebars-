const mongoose = require("mongoose");

const emp_table = new mongoose.Schema({
    fname : {type:String,required:true},
    lname : {type:String,required:true},

    gender : {type:String,required:true},
    department : {type:String,required:true},

    salary : {type:Number,required:true},
    contact : {type:String,required:true,unique:true},

    email : {type:String,required:true,unique:true},
    address : {type:String,required:true,unique:true},

    created_at : {type:String,required:true},
    updated_at : {type:String,required:true}
});
    

const emp_model = new mongoose.model("employees",emp_table);
module.exports = emp_model;