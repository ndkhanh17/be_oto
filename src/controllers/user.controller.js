const User = require("../models/user.model")
const AppError = require("../utils/error")
const bcrypt = require("bcryptjs")

// Get all users (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const users = await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await User.countDocuments()

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

// Get user by ID (admin only)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return next(new AppError("Không tìm thấy người dùng", 404))
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// Create user (admin only)
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return next(new AppError("Email đã được sử dụng", 400))
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "user",
    })

    // Remove password from response
    user.password = undefined

    res.status(201).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// Update user (admin only)
exports.updateUser = async (req, res, next) => {
  try {
    // Don't allow password updates through this route
    if (req.body.password) {
      delete req.body.password
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) {
      return next(new AppError("Không tìm thấy người dùng", 404))
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return next(new AppError("Không tìm thấy người dùng", 404))
    }

    res.status(200).json({
      success: true,
      message: "Người dùng đã được xóa thành công",
    })
  } catch (error) {
    next(error)
  }
}

// Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    // Don't allow role updates through this route
    if (req.body.role) {
      delete req.body.role
    }

    // If password is being updated, hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true })

    // Remove password from response
    user.password = undefined

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}
