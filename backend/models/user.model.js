const mongoose = require('mongoose');
const db = require ('../configurations/db');

const bcrypt = require('bcrypt'); //for hashing our password

const {Schema} = mongoose;

const userSchema = new Schema ({
    email:{
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function () {
    try{
        var user = this;
        const salt = await bcrypt.genSalt(10); //inbuilt for hashing, 10 is hashing factor
        const hashpass = await bcrypt.hash(user.password, salt); //passes pass. for hashing

        user.password = hashpass; //now store hashed password
    }
    catch(err){
        throw err;
    }
})

userSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.password)
        return isMatch;
    }
    catch (err){
        throw err;
    }
}

const UserModel = db.model('user', userSchema);

module.exports = UserModel;