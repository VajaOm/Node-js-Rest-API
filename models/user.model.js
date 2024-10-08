const connectDb = require('../config/db.js');
const mongodb = require('mongodb');

class UserModel {

    constructor() {
        this.collection = null;
    }

    //init() function run if the there is no collection
    async init() {
        if (!this.collection) {
            const db = await connectDb();
            this.collection = await db.collection('users');
        }
    }

    async addUser(user) {
        await this.init();
        console.log("collection : ",this.collection);
        const result = await this.collection.insertOne(user);
        console.log(result);
        return result;
    }

    async getAllUser() {
        await this.init();
        const users = await this.collection.find().toArray();
        return users;
    }

    async getUserById(userId) {
        await this.init();
        const user = await this.collection.findOne({ _id: new mongodb.ObjectId(userId) });
        return user;
    }

    async updateUser(id, updateFields) {
        await this.init();
        const result = await this.collection.updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updateFields });
        return result;
    }

    async deleteUser(id) {
        await this.init();
        const result = await this.collection.deleteOne({ _id: new mongodb.ObjectId(id) });
        return result;
    }
}

module.exports = UserModel;