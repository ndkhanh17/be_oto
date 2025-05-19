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
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
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
