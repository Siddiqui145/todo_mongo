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

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("Login Attempt:", email, password); // Debugging

        const user = await UserService.checkUser(email);

        if (!user) {
            return res.status(400).json({ status: false, message: "User does not exist" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }

        let tokenData = { _id: user._id, email: user.email };

        const token = await UserService.generateToken(tokenData, "123456", "1h");

        if (!token) {
            console.error("Error: Token is null or undefined");
            return res.status(500).json({ status: false, message: "Token generation failed" });
        }

        console.log("Generated Token:", token); // Debugging

        return res.status(200).json({ status: true, token: token });
    } catch (e) {
        console.error("Login Error:", e);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};
