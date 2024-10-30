const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourid) filter = { tour: req.params.tourid };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    resultes: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createRewview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourid;
  if (!req.body.user) req.body.user = req.user.id;
  const newreview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newreview,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppErorr('No review found with tah ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});
