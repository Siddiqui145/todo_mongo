const express = require('express');
const body_parser = require('body-parser'); //used to handle data that arrives from routes
const userRouter = require('./routers/user.router')

const app = express();

app.use(body_parser.json());

app.use('/', userRouter);

module.exports = app;