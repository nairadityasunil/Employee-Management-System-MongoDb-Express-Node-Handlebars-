const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/employee_db").then(()=>{ 
    console.log("Connected Database : employee_db");
}).catch((e)=>{ 
    console.log(e);
    console.log("Connection With Employee Database Unsuccessfull");
});
