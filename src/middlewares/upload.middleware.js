const multer = require("multer")
const path = require("path")
const fs = require("fs")
const AppError = require("../utils/error")

// Đảm bảo thư mục upload tồn tại
const createUploadDirs = () => {
  const dirs = [
    path.join(__dirname, "../../public/uploads"),
    path.join(__dirname, "../../public/uploads/cars"),
    path.join(__dirname, "../../public/uploads/news"),
  ]

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

createUploadDirs()

// Cấu hình lưu trữ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Xác định thư mục đích dựa trên route
    let uploadPath = path.join(__dirname, "../../public/uploads")

    if (req.originalUrl.includes("/cars") || req.originalUrl.includes("/upload/image")) {
      uploadPath = path.join(__dirname, "../../public/uploads/cars")
    } else if (req.originalUrl.includes("/news")) {
      uploadPath = path.join(__dirname, "../../public/uploads/news")
    }

    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, uniqueSuffix + ext)
  },
})

// Lọc file
const fileFilter = (req, file, cb) => {
  // Chỉ chấp nhận file hình ảnh
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new AppError("Chỉ cho phép tải lên file hình ảnh!", 400), false)
  }
  cb(null, true)
}

// Export middleware upload
exports.upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
  fileFilter: fileFilter,
})
