const UserServices = require('../services/user.services.js');
const parseJson = require('../utils/parseJson.js');

const userServices = new UserServices();

class UserController {

    async addUser(req, res) {
        try {

            const user = await parseJson(req);
            const insertedUser = await userServices.addUser(user);
            console.log(insertedUser);
            res.writeHead(201, { 'Content-Type': 'application/x-www-form-urlencoded' });
            res.end(JSON.stringify(insertedUser))

        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }

    async getAllUsers(req, res) {
        try {

            const users = await userServices.getAllUser();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));

        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }


    async getUserById(req, res, params) {

        const userId = params;

        try {

            const user = await userServices.getUser(userId);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'User Not Found' }));
            }


        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }

    async updateUser(req, res, params) {
        const id = params;
        try {

            const updateUserData = await parseJson(req);

            const result = await userServices.updateUser(id, updateUserData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));

        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }

    async deleteUser(req, res, params) {
        const id = params;

        try {

            const result = await userServices.deleteUser(id);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));

        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }

};

module.exports = UserController;