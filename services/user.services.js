const UserModel = require('../models/user.model.js');

const userModel = new UserModel();

class UserServices {
    async addUser(user) {
        return userModel.addUser(user);
    }

    async getAllUser() {
        return userModel.getAllUser();
    }

    async getUser(userId) {
        return userModel.getUserById(userId);
    }

    async updateUser(id, { property, value }) {
        return userModel.getUserById(id, { property, value });
    }

    async deleteUser(id) {
        return userModel.deleteUser(id);
    }
};

module.exports = UserServices;