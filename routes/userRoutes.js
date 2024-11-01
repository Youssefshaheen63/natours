const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('../controllers/authenticationController');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);

router.post('/forgetpassword', authController.forgetPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.patch(
  '/updatemypassword',
  authController.protect,
  authController.updatePassword,
);
router.patch('/updateme', authController.protect, userController.updateMe);
router.delete('/deleteme', authController.protect, userController.deleteMe);
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
