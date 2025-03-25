const mongoose = require('mongoose'); //Import mongoose

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/todo-app'); //inbuilt command for creating connection

connection.on('open', () => {
    console.log("MongoDB Connected");
}).on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

module.exports = connection; //exported for use in index