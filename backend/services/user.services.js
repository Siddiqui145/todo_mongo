// Database Handling
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

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

    static async checkUser(email){
        try{
            return await UserModel.findOne({email});
        }
        catch(err){
            throw err;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
    }
}

module.exports = UserService