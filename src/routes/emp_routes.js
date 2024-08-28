const { new_emp, emp_list, update_details, save_update, delete_emp } = require('../controllers/emp_controller');

const e_routes = require('express').Router();

// Routes to add new employee
e_routes.get('/new_emp', (req, res) => {
    console.log("\nRedirecting to add employee page.\n");
    res.render("add_emp"); // Render the form for adding new employee
});

e_routes.post('/save_emp', new_emp); // Handle form submission

// Routes to display all employees
e_routes.get('/all_emp', emp_list);

// Rotues to update employee
e_routes.get('/update/:id', update_details);
e_routes.post('/save_update/:id' , save_update);

// Route to delete employee
e_routes.get('/delete/:id', delete_emp);
    
module.exports = e_routes;
