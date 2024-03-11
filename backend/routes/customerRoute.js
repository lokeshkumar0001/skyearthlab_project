const express = require('express');
const { isAuth } = require('../middlewares/auth');
const { createCustomer, getMyCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const customerRoute = express.Router();

customerRoute.route('/').get(isAuth,getMyCustomer)
customerRoute.route('/new').post(isAuth,createCustomer)
customerRoute.route('/:customerId').put(isAuth,updateCustomer).delete(isAuth,deleteCustomer)

module.exports = customerRoute