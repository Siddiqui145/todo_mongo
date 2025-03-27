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
        try {
            const user = await UserModel.findOne({ email: email });
            console.log("User Found:", user); // Debug log
            return user;
        } catch (err) {
            console.error("Database Error:", err);
            throw err;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        try {
            const token = jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
            console.log("Generated Token:", token); // Debug log
            return token;
        }
        catch (error) {
            console.error("JWT Error:", error);
            return null;  // Ensure it does not return an empty object
        }
    }
}

module.exports = UserService