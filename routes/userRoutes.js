const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('../controllers/authenticationController');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.post('/forgetpassword', authController.forgetPassword);
router.patch('/resetpassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updatemypassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateme', userController.updateMe);
router.delete('/deleteme', userController.deleteMe);

router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
