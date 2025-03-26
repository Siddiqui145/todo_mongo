const router = require('express').Router();
const UserController = require('../controllers/user.controllers')

router.post('/registration', UserController.register)

router.post('/login', UserController.login) // Step 1 to create router

module.exports = router;