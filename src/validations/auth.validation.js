const { body, validationResult } = require("express-validator")
const AppError = require("../utils/error")

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg)
    return next(new AppError(errorMessages.join(", "), 400))
  }
  next()
}

// Validate register input
exports.validateRegister = [
  body("name").notEmpty().withMessage("Vui lòng nhập tên").trim(),
  body("email")
    .notEmpty()
    .withMessage("Vui lòng nhập email")
    .isEmail()
    .withMessage("Email không hợp lệ")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Vui lòng nhập mật khẩu")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
  body("phone")
    .notEmpty()
    .withMessage("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{10,11}$/)
    .withMessage("Số điện thoại không hợp lệ"),
  handleValidationErrors,
]

// Validate login input
exports.validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Vui lòng nhập email")
    .isEmail()
    .withMessage("Email không hợp lệ")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Vui lòng nhập mật khẩu"),
  handleValidationErrors,
]
