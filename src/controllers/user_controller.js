const user_model = require("../models/user_model");

const authenticate = async (req,res) => {
    try {
        const in_username = req.body.username;
        const in_password = req.body.password;
        
        const user = await user_model.findOne({username : in_username});
        if(user)
        {
            console.log(user.username);
            console.log(user.password);
            if(in_password === user.password)
            {
                console.log("\nLogin Successfull ...");
                res.redirect('/emp/all_emp');
            }
            else
            {
                console.log("Invalid Login Credentials");
                res.send("<script>alert('Invalid Login Credentials !!!'); window.location.href = '/'; </script>");
            }
        }
        else
        {
            console.log("Invalid Login Credentials");
            res.send("<script>alert('Invalid Login Credentials !!!'); window.location.href = '/'; </script>");
        }
    } catch (error) {
        console.log("\n"+error);
    }
};

const user_list = async (req,res) => {
    try {
        const users = await user_model.find(); // Fetch all Users
        res.render("all_users", { users });
    } catch (error) {
        res.send("<script>alert('Internal Server Error !!!');window.location.href = '/emp/new_emp'; </script>");
    }
};

const update_user = async (req,res) => {
    try {
        const user = await user_model.findById(req.params.id);
        res.render('update_user',{user});
    } catch (error) {
        console.log("\n"+error);
    }
};

const save_update = async (req,res) => {
    const id = req.params.id;
    const updates = req.body;
    
    try {
        
        const update_result = await user_model.updateOne({_id :id},updates);

        if (update_result.matchedCount === 0) {
            res.send("<script>alert('User Not Found !!!');window.location.href = '/user/all_users'; </script>");
        }

        if (update_result.modifiedCount === 0) {
            console.log("\nNo Changes Made.");
            res.send("<script>alert('User updated successfully!');window.location.href = '/user/all_users';</script>");
        }
        res.send("<script>alert('User updated successfully!');window.location.href = '/user/all_users';</script>");
    } catch (error) {
        console.log("\n"+error);
    }
}

module.exports = {
    authenticate,
    user_list,
    update_user,
    save_update
}   