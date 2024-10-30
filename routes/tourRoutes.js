const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('../controllers/authenticationController');
const reviewRouter = require('./../routes/reviewRoutes');
const router = express.Router();

// router.param('id', tourController.checkID);

// router
//   .route('/:tourid/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createRewview,
//   );

router.use('/:tourid/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );
// Always use protect to make sure user is logged in

module.exports = router;
