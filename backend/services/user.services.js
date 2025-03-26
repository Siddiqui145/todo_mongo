// Database Handling
const UserModel = require('../models/user.model')

// This part allows us to get the data and save it in our database

class UserService {
    static async registerUser(email, password) {
        try{
            const createUser = new UserModel({email, password});
            return await createUser.save();
        }
        catch(e){
            throw e;
        }
    }

}

module.exports = UserService