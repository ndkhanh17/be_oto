const AppError = require("../utils/error")

// Validate create dealership input
exports.validateCreateDealership = (req, res, next) => {
  const { name, address, city, phone, email } = req.body

  if (!name || !address || !city || !phone || !email) {
    return next(new AppError("Vui lòng cung cấp đầy đủ thông tin đại lý", 400))
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return next(new AppError("Email không hợp lệ", 400))
  }

  const phoneRegex = /^[0-9]{10,11}$/
  if (!phoneRegex.test(phone)) {
    return next(new AppError("Số điện thoại không hợp lệ", 400))
  }

  next()
}

// Validate update dealership input
exports.validateUpdateDealership = (req, res, next) => {
  const { email, phone } = req.body

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return next(new AppError("Email không hợp lệ", 400))
    }
  }

  if (phone) {
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phone)) {
      return next(new AppError("Số điện thoại không hợp lệ", 400))
    }
  }

  next()
}
