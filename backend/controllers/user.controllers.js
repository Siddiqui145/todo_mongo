const UserService = require('../services/user.services');

exports.register = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const successRes = await UserService.registerUser(email, password);

        res.json({status:true, success: "User Registered Successfully!!"});
    }
    catch (e){
        throw e;
    }
}

exports.login = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await UserService.checkUser(email);

        if(!user){
            throw new Error("User does not exist")
        }

        const isMatch = await user.comparePassword(password)

        if(isMatch === false){
            throw new Error('Password Invalid')
        }

        let tokenData = {_id:user._id, email: user.email};

        const token = UserService.generateToken(tokenData, "123456", "1h")

        res.status(200).json({status: true, token: token })
        
    }
    catch (e){
        throw e;
    }
}