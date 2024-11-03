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
    reviewController.setTourUserIds,
    reviewController.createRewview,
  );
router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.deleteReview,
  )
  .patch(reviewController.updateReview);

module.exports = router;
