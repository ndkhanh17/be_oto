const path = require('path');
const fs = require('fs');
const AppError = require('../utils/error');

// Upload một hình ảnh
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('Vui lòng chọn một hình ảnh để tải lên', 400));
    }

    const { filename, originalname, mimetype, size } = req.file;
    const id = filename.split('.')[0]; // Lấy phần ID từ tên file

    res.status(200).json({
      success: true,
      data: {
        id,
        url: `/uploads/cars/${filename}`,
        filename,
        originalname,
        mimetype,
        size,
        uploadedAt: new Date()
      }
    });
  } catch (error) {
    next(error);
  }
};

// Upload nhiều hình ảnh
exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(new AppError('Vui lòng chọn ít nhất một hình ảnh để tải lên', 400));
    }

    const uploadedImages = req.files.map(file => {
      const { filename, originalname, mimetype, size } = file;
      const id = filename.split('.')[0]; // Lấy phần ID từ tên file
      
      return {
        id,
        url: `/uploads/cars/${filename}`,
        filename,
        originalname,
        mimetype,
        size,
        uploadedAt: new Date()
      };
    });

    res.status(200).json({
      success: true,
      count: uploadedImages.length,
      data: uploadedImages
    });
  } catch (error) {
    next(error);
  }
};

// Xóa hình ảnh
exports.deleteImage = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, '../../public/uploads/cars', filename);

    if (!fs.existsSync(imagePath)) {
      return next(new AppError('Không tìm thấy hình ảnh', 404));
    }

    fs.unlinkSync(imagePath);

    res.status(200).json({
      success: true,
      message: 'Xóa hình ảnh thành công'
    });
  } catch (error) {
    next(error);
  }
};