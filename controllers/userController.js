const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppErorr = require('../utils/errorApp');

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: this.getAllUsers.length,
    data: {
      users,
    },
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defiend',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppErorr(
        'This route is not for update password, Please use /updatemypassword.',
        400,
      ),
    );
  }

  const filterBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defiend',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defiend',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defiend',
  });
};
