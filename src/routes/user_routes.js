const { user_list, update_user, save_update } = require('../controllers/user_controller');

const u_routes = require('express').Router();

u_routes.get('/all_users', user_list);
u_routes.get('/update/:id',update_user);
u_routes.post('/save_update/:id', save_update);
module.exports = u_routes;