const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/error');

// Đổi tên từ protect sang authenticate
exports.authenticate = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return next(new AppError('Không có quyền truy cập', 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new AppError('Không tìm thấy người dùng với token này', 401));
      }

      // Add user to request
      req.user = user;
      next();
    } catch (error) {
      return next(new AppError('Không có quyền truy cập', 401));
    }
  } catch (error) {
    next(error);
  }
};

// Grant access to specific roles
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('Không có quyền thực hiện hành động này', 403));
  }
  next();
};