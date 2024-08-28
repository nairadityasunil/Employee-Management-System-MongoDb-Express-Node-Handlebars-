const emp_model = require("../models/emp_model"); // Importing employee model

// Function to add a new employee
const new_emp = async (req, res) => {
    var now = new Date().toLocaleString();
    // var now = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear() + " -> " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    console.log("\nSaving New Employee Details !!");
    const add_emp = new emp_model({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        department: req.body.department,
        salary: req.body.salary,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        created_at: now,
        updated_at: now
    });

    if (await add_emp.save()) {
        console.log("New Employee Details Saved ...");
        res.send("<script>alert('New Employee Details Saved Successfully !!!');window.location.href = '/emp/all_emp'; </script>");
    }

};

// Function to get details of all employees
const emp_list = async (req, res) => {
    console.log("Fetching Employees List.\n");
    try {
        const employees = await emp_model.find(); // Fetch all employees
        console.log("\nEmployees List Fetched.\nRedirecting ... ");
        res.render("all_emp", { employees });
    } catch (error) {
        console.error("\nError fetching employee data:", error);
        res.send("<script>alert('Internal Server Error !!!');window.location.href = '/emp/new_emp'; </script>");
    }
};


// Redirecting to update form
const update_details = async (req,res) => {
    try {
        const emp = await emp_model.findById(req.params.id);
        if(!emp)
        {
            console.log("\nEmployee not found");
            res.send("<script>alert('Employee Not Found !!!');window.location.href = '/emp/all_emp'; </script>");
        }
        res.render('update_form',{emp});
    } catch (error) {
        console.log("\n"+error);
    }
};

const save_update = async(req,res) => {
    const id = req.params.id;
    const updates = req.body;
    updates.updated_at = new Date().toLocaleString();
    
    try {
        console.log("Updating Employee Details.\n");
        
        const update_result = await emp_model.updateOne({_id :id},updates);

        if (update_result.matchedCount === 0) {
            console.log("\nEmployee not found.");
            res.send("<script>alert('Employee Not Found !!!');window.location.href = '/emp/all_emp'; </script>");
        }

        if (update_result.modifiedCount === 0) {
            console.log("\nNo Changes Made.");
            res.send("<script>alert('Employee updated successfully!');window.location.href = '/emp/all_emp';</script>");
        }

        console.log("\nEmployee updated successfully ...");
        res.send("<script>alert('Employee updated successfully!');window.location.href = '/emp/all_emp';</script>");
    } catch (error) {
        console.log("\n"+error);
    }
};

const delete_emp = async (req,res) => {
    const id = req.params.id; 
    try {
        const delete_result = await emp_model.deleteOne({_id : id});

        if(delete_result.deletedCount == 0)
        {
            console.log("\nEmployee not found.");
            res.send("<script>alert('Employee Not Found !!!');window.location.href = '/emp/all_emp'; </script>");
        }

        console.log("\nEmployee deleted successfully ...");
        res.send("<script>alert('Employee deleted successfully!');window.location.href = '/emp/all_emp';</script>");
    } catch (error) {
        console.log("\n"+error);
    }
};

module.exports = {
    new_emp,
    emp_list,
    update_details,
    save_update,
    delete_emp
}