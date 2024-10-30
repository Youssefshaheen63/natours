const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('../controllers/authenticationController');
const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createRewview,
  );
router.route('/:id').get(authController.protect, reviewController.getReview);

module.exports = router;
