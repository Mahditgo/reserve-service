const express = require('express');
const userController = require('./../controllers/user.controller');
const protectAccessToken = require('./../middlewares/auth.middleware');
const router = express.Router();





router
.get('/',                                          userController.getAllUsers)
.get('/:id',                                       userController.getUserById)
.post('/updatePassword',  protectAccessToken,      userController.updatePassword)
.post('/forgot-password',                          userController.forgotPassword)
.post('/reset-password/:resetToken',               userController.resetPassword)




module.exports = router;