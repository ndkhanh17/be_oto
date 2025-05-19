const AppError = require("../utils/error")

// Validate create user input
exports.validateCreateUser = (req, res, next) => {
  const { name, email, password, phone, role } = req.body

  if (!name || !email || !password) {
    return next(new AppError("Vui lòng cung cấp tên, email và mật khẩu", 400))
  }

  if (password.length < 6) {
    return next(new AppError("Mật khẩu phải có ít nhất 6 ký tự", 400))
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return next(new AppError("Email không hợp lệ", 400))
  }

  if (phone) {
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phone)) {
      return next(new AppError("Số điện thoại không hợp lệ", 400))
    }
  }

  if (role && !["user", "admin"].includes(role)) {
    return next(new AppError("Vai trò không hợp lệ", 400))
  }

  next()
}

// Validate update user input
exports.validateUpdateUser = (req, res, next) => {
  const { email, password, phone, role } = req.body

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return next(new AppError("Email không hợp lệ", 400))
    }
  }

  if (password && password.length < 6) {
    return next(new AppError("Mật khẩu phải có ít nhất 6 ký tự", 400))
  }

  if (phone) {
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phone)) {
      return next(new AppError("Số điện thoại không hợp lệ", 400))
    }
  }

  if (role && !["user", "admin"].includes(role)) {
    return next(new AppError("Vai trò không hợp lệ", 400))
  }

  next()
}
