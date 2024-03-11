const express = require('express');
const { register, getUser, login, logoutUser, updateUser } = require('../controllers/userController');
const { isAuth } = require('../middlewares/auth');
const userRoute = express.Router();


userRoute.route('/').post(register)
userRoute.route('/login').post(login)
userRoute.route('/logout').get(isAuth,logoutUser)
userRoute.route('/me').get(isAuth,getUser).put(isAuth,updateUser)

// userRoute.route('/find').get()

module.exports = userRoute