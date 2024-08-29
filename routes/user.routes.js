const UserController = require('../controller/user.controller');
const { API_ROUTE } = require('../constants');

const userController = new UserController();

const routes = {
    [`POST ${API_ROUTE}/adduser`]: userController.addUser,
    [`GET ${API_ROUTE}/getallusers`]: userController.getAllUsers,
    [`GET ${API_ROUTE}/getuserbyid/:id`]: userController.getUserById,
    [`PUT ${API_ROUTE}/updateuser/:id`]: userController.updateUser,
    [`DELETE ${API_ROUTE}/deleteuser/:id`]: userController.deleteUser,

    // Home route
    'GET /': (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Welcome to the User API' }));
    }
};

const handleRequest = async (req, res) => {
    const { method, url } = req;
    const route = `${method} ${url.split('?')[0]}`;

    // Extract route patterns and parameters
    for (let pattern in routes) {
        const regexPattern = pattern.replace(/:\w+/g, '([^/]+)');
        const regex = new RegExp(`^${regexPattern}$`);
        const match = regex.exec(route);

        if (match) {
            const handler = routes[pattern];
            const params = extractParams(pattern, match);
            await handler(req, res, params);
            return;
        }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
};

// Extract parameters from matched route
const extractParams = (pattern, match) => {
    const keys = (pattern.match(/:\w+/g) || []).map(key => key.slice(1));
    const values = match.slice(1);
    return keys.reduce((params, key, index) => {
        params[key] = values[index];
        return params;
    }, {});
};

module.exports = handleRequest;
