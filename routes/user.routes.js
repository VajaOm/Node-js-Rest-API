const UserController = require('../controller/user.controller');
const { API_ROUTE } = require('../constants');

const userController = new UserController();

const routes = {
    [`POST ${API_ROUTE}/adduser`]: userController.addUser,
    [`GET ${API_ROUTE}/getallusers`]: userController.getAllUsers,
    [`GET ${API_ROUTE}/getuserbyid/:id`]: userController.getUserById,
    [`PUT ${API_ROUTE}/updateuser/:id`]: userController.updateUser,
    [`DELETE ${API_ROUTE}/deleteuser/:id`]: userController.deleteUser
};

const handleRequest = async (req, res) => {
    const { method, url } = req;

    const route = `${method} ${url.split('?')[0]}`;

    if (routes[route]) {
        await routes[route](req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }

};

module.exports = handleRequest;