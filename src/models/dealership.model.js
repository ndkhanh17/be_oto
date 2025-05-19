const mongoose = require("mongoose")

const dealershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên đại lý"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Vui lòng nhập hãng xe"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Đại lý chính hãng", "Salon xe cũ"],
      default: "Đại lý chính hãng",
    },
    address: {
      type: String,
      required: [true, "Vui lòng nhập địa chỉ"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Vui lòng nhập thành phố"],
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Vui lòng nhập số điện thoại"],
      trim: true,
      match: [/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"],
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ"],
    },
    website: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    openingHours: {
      type: String,
      trim: true,
    },
    services: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    carsCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Dealership", dealershipSchema)
