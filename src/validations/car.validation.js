const AppError = require("../utils/error")

// Validate create car input
// Validate create car input
exports.validateCreateCar = (req, res, next) => {
  const { title, brand, model } = req.body;

  if (!title || !brand || !model) {
    return next(new AppError("Vui lòng cung cấp ít nhất tiêu đề, hãng và mẫu xe", 400));
  }

  // Validate year if provided
  if (req.body.year) {
    const currentYear = new Date().getFullYear();
    if (Number.parseInt(req.body.year) < 1900 || Number.parseInt(req.body.year) > currentYear + 1) {
      return next(new AppError("Năm sản xuất không hợp lệ", 400));
    }
  }

  // Validate price if provided
  if (req.body.price && Number.parseInt(req.body.price) <= 0) {
    return next(new AppError("Giá xe phải lớn hơn 0", 400));
  }

  next();
};

// Validate update car input
exports.validateUpdateCar = (req, res, next) => {
  const { year, price } = req.body

  // Validate year if provided
  if (year) {
    const currentYear = new Date().getFullYear()
    if (Number.parseInt(year) < 1900 || Number.parseInt(year) > currentYear + 1) {
      return next(new AppError("Năm sản xuất không hợp lệ", 400))
    }
  }

  // Validate price if provided
  if (price && Number.parseInt(price) <= 0) {
    return next(new AppError("Giá xe phải lớn hơn 0", 400))
  }

  next()
}
