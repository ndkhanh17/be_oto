const AppError = require("../utils/error")

// Validate create news input
exports.validateCreateNews = (req, res, next) => {
  const { title, content, author } = req.body

  if (!title || !content || !author) {
    return next(new AppError("Vui lòng cung cấp tiêu đề, nội dung và tác giả", 400))
  }

  if (title.length < 5) {
    return next(new AppError("Tiêu đề phải có ít nhất 5 ký tự", 400))
  }

  if (content.length < 20) {
    return next(new AppError("Nội dung phải có ít nhất 20 ký tự", 400))
  }

  next()
}

// Validate update news input
exports.validateUpdateNews = (req, res, next) => {
  const { title, content } = req.body

  if (title && title.length < 5) {
    return next(new AppError("Tiêu đề phải có ít nhất 5 ký tự", 400))
  }

  if (content && content.length < 20) {
    return next(new AppError("Nội dung phải có ít nhất 20 ký tự", 400))
  }

  next()
}
