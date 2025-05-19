const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Vui lòng nhập tiêu đề tin tức"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Vui lòng nhập nội dung tin tức"],
    },
    excerpt: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Vui lòng nhập tác giả"],
      trim: true,
    },
    image: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    category: {
      type: String,
      enum: ["Tin tức", "Đánh giá xe", "Tư vấn", "So sánh"],
      default: "Tin tức",
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
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

module.exports = mongoose.model("News", newsSchema)
