const mongoose = require("mongoose")

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Vui lòng nhập tiêu đề xe"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Vui lòng nhập hãng xe"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Vui lòng nhập mẫu xe"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Vui lòng nhập năm sản xuất"],
    },
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá xe"],
    },
    mileage: {
      type: Number,
      default: 0,
    },
    fuel: {
      type: String,
      required: [true, "Vui lòng nhập loại nhiên liệu"],
      enum: [
        "Gasoline",
        "Diesel",
        "Electric",
        "Hybrid",
        "Xăng",
        "Dầu",
        "Điện",
        "Hybrid",
        "gasoline",
        "diesel",
        "electric",
        "hybrid",
      ],
    },
    transmission: {
      type: String,
      required: [true, "Vui lòng nhập loại hộp số"],
      enum: [
        "Manual",
        "Automatic",
        "Semi-Automatic",
        "Số sàn",
        "Số tự động",
        "Bán tự động",
        "manual",
        "automatic",
        "cvt",
      ],
    },
    type: {
      type: String,
      required: [true, "Vui lòng nhập loại xe"],
      enum: ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Pickup", "Van", "Minivan", "Wagon", "new", "used"],
    },
    status: {
      type: String,
      required: [true, "Vui lòng nhập trạng thái xe"],
      enum: ["New", "Used", "Mới", "Đã qua sử dụng", "active", "pending", "rejected"],
    },
    description: {
      type: String,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    seller: {
      name: {
        type: String,
        required: [true, "Vui lòng nhập tên người bán"],
      },
      phone: {
        type: String,
        required: [true, "Vui lòng nhập số điện thoại người bán"],
      },
      email: {
        type: String,
      },
      location: {
        type: String,
      },
      type: {
        type: String,
        enum: ["Cá nhân", "Đại lý"],
        default: "Cá nhân",
      },
    },
    images: [
      {
        url: {
          type: String,
        },
        filename: {
          type: String,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "Không xác định",
    },
    seats: {
      type: Number,
      default: 5,
    },
    engine: {
      type: String,
    },
    location: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model("Car", carSchema)
