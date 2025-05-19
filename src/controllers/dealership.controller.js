const Dealership = require("../models/dealership.model")
const AppError = require("../utils/error")

// Get all dealerships with pagination
exports.getAllDealerships = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const dealerships = await Dealership.find().sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await Dealership.countDocuments()

    res.status(200).json({
      success: true,
      count: dealerships.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: dealerships,
    })
  } catch (error) {
    next(error)
  }
}

// Get dealership by ID
exports.getDealershipById = async (req, res, next) => {
  try {
    const dealership = await Dealership.findById(req.params.id)

    if (!dealership) {
      return next(new AppError("Không tìm thấy đại lý", 404))
    }

    res.status(200).json({
      success: true,
      data: dealership,
    })
  } catch (error) {
    next(error)
  }
}

// Create new dealership (admin only)
exports.createDealership = async (req, res, next) => {
  try {
    const dealership = await Dealership.create({
      ...req.body,
      createdBy: req.user.id,
    })

    res.status(201).json({
      success: true,
      data: dealership,
    })
  } catch (error) {
    next(error)
  }
}

// Update dealership (admin only)
exports.updateDealership = async (req, res, next) => {
  try {
    const dealership = await Dealership.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!dealership) {
      return next(new AppError("Không tìm thấy đại lý", 404))
    }

    res.status(200).json({
      success: true,
      data: dealership,
    })
  } catch (error) {
    next(error)
  }
}

// Delete dealership (admin only)
exports.deleteDealership = async (req, res, next) => {
  try {
    const dealership = await Dealership.findByIdAndDelete(req.params.id)

    if (!dealership) {
      return next(new AppError("Không tìm thấy đại lý", 404))
    }

    res.status(200).json({
      success: true,
      message: "Đại lý đã được xóa thành công",
    })
  } catch (error) {
    next(error)
  }
}

// Get dealerships by city
exports.getDealershipsByCity = async (req, res, next) => {
  try {
    const dealerships = await Dealership.find({
      city: { $regex: req.params.city, $options: "i" },
    })

    res.status(200).json({
      success: true,
      count: dealerships.length,
      data: dealerships,
    })
  } catch (error) {
    next(error)
  }
}
