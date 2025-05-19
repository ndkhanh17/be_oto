const Car = require("../models/car.model")
const AppError = require("../utils/error")
const fs = require("fs")
const path = require("path")

// Lấy tất cả xe với phân trang
exports.getAllCars = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const cars = await Car.find().sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await Car.countDocuments()

    res.status(200).json({
      success: true,
      count: cars.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: cars,
    })
  } catch (error) {
    next(error)
  }
}

// Lấy xe nổi bật
exports.getFeaturedCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ featured: true }).limit(6)

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    })
  } catch (error) {
    next(error)
  }
}

// Lấy xe theo ID
exports.getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return next(new AppError("Không tìm thấy xe", 404))
    }

    res.status(200).json({
      success: true,
      data: car,
    })
  } catch (error) {
    next(error)
  }
}

// Lấy xe theo hãng
exports.getCarsByBrand = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const cars = await Car.find({ brand: req.params.brand }).sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await Car.countDocuments({ brand: req.params.brand })

    res.status(200).json({
      success: true,
      count: cars.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: cars,
    })
  } catch (error) {
    next(error)
  }
}

// Tìm kiếm xe
exports.searchCars = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const query = req.query.q

    const searchQuery = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }

    const cars = await Car.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await Car.countDocuments(searchQuery)

    res.status(200).json({
      success: true,
      count: cars.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: cars,
    })
  } catch (error) {
    next(error)
  }
}

// Tạo xe mới
// Tạo xe mới
exports.createCar = async (req, res, next) => {
  try {
    const {
      title,
      brand,
      model,
      year,
      price,
      mileage,
      fuel,
      transmission,
      type,
      status,
      description,
      features,
      seller,
      imageIds,
      images: imageUrls // Thêm trường này để nhận mảng URL hình ảnh
    } = req.body;

    // Xử lý features nếu là chuỗi JSON
    let parsedFeatures;
    try {
      parsedFeatures = features ? (typeof features === "string" ? JSON.parse(features) : features) : [];
    } catch (error) {
      parsedFeatures = features ? [features] : [];
    }

    // Xử lý seller nếu là chuỗi JSON
    let parsedSeller;
    try {
      parsedSeller = seller ? (typeof seller === "string" ? JSON.parse(seller) : seller) : {};
    } catch (error) {
      parsedSeller = { name: "Unknown", phone: "Unknown" };
      if (seller && typeof seller === "string") {
        parsedSeller.name = seller;
      }
    }

    // Xử lý hình ảnh từ IDs
    let images = [];

    // Trường hợp 1: Sử dụng imageIds
    if (imageIds && Array.isArray(imageIds) && imageIds.length > 0) {
      imageIds.forEach(id => {
        // Tìm file trong thư mục uploads/cars
        const uploadsDir = path.join(__dirname, "../../public/uploads/cars");
        const files = fs.readdirSync(uploadsDir);
        
        // Tìm file có ID tương ứng
        const matchingFile = files.find(file => file.startsWith(id));
        
        if (matchingFile) {
          images.push({
            url: `/uploads/cars/${matchingFile}`,
            filename: matchingFile
          });
        }
      });
    }
    // Trường hợp 2: Sử dụng mảng URL hình ảnh trực tiếp
    else if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
      images = imageUrls.map(url => {
        const filename = url.split('/').pop();
        return {
          url,
          filename
        };
      });
    }

    console.log("Images to save:", images);

    const car = await Car.create({
      title,
      brand,
      model,
      year: Number.parseInt(year || 0),
      price: Number.parseInt(price || 0),
      mileage: Number.parseInt(mileage || 0),
      fuel,
      transmission,
      type,
      status,
      description,
      features: parsedFeatures,
      seller: parsedSeller,
      images,
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    next(error);
  }
};

// Cập nhật xe
exports.updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return next(new AppError("Không tìm thấy xe", 404))
    }

    // Kiểm tra quyền (nếu không phải admin)
    if (
      req.user &&
      req.user.role !== "admin" &&
      car.createdBy &&
      car.createdBy.toString() !== req.user._id.toString()
    ) {
      return next(new AppError("Bạn không có quyền cập nhật xe này", 403))
    }

    // Xử lý features và seller nếu là chuỗi JSON
    if (req.body.features) {
      req.body.features = typeof req.body.features === "string" ? JSON.parse(req.body.features) : req.body.features
    }

    if (req.body.seller) {
      req.body.seller = typeof req.body.seller === "string" ? JSON.parse(req.body.seller) : req.body.seller
    }

    // Xử lý hình ảnh từ IDs
    if (req.body.imageIds && Array.isArray(req.body.imageIds) && req.body.imageIds.length > 0) {
      const images = []
      req.body.imageIds.forEach((id) => {
        // Tìm file trong thư mục uploads/cars
        const uploadsDir = path.join(__dirname, "../../public/uploads/cars")
        const files = fs.readdirSync(uploadsDir)

        // Tìm file có ID tương ứng
        const matchingFile = files.find((file) => file.startsWith(id))

        if (matchingFile) {
          images.push({
            url: `/uploads/cars/${matchingFile}`,
            filename: matchingFile,
          })
        }
      })

      // Thêm hình ảnh mới vào mảng hiện có
      if (images.length > 0) {
        req.body.images = [...(car.images || []), ...images]
      }
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.status(200).json({
      success: true,
      data: updatedCar,
    })
  } catch (error) {
    next(error)
  }
}

// Xóa xe
exports.deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return next(new AppError("Không tìm thấy xe", 404))
    }

    // Kiểm tra quyền (nếu không phải admin)
    if (
      req.user &&
      req.user.role !== "admin" &&
      car.createdBy &&
      car.createdBy.toString() !== req.user._id.toString()
    ) {
      return next(new AppError("Bạn không có quyền xóa xe này", 403))
    }

    // Xóa hình ảnh từ server
    if (car.images && car.images.length > 0) {
      car.images.forEach((image) => {
        const imagePath = path.join(__dirname, "../../public/uploads/cars", image.filename)
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      })
    }

    await Car.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "Xe đã được xóa thành công",
    })
  } catch (error) {
    next(error)
  }
}

// Xóa hình ảnh xe
exports.deleteCarImage = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return next(new AppError("Không tìm thấy xe", 404))
    }

    // Kiểm tra quyền (nếu không phải admin)
    if (
      req.user &&
      req.user.role !== "admin" &&
      car.createdBy &&
      car.createdBy.toString() !== req.user._id.toString()
    ) {
      return next(new AppError("Bạn không có quyền xóa hình ảnh xe này", 403))
    }

    // Tìm hình ảnh
    const imageIndex = car.images.findIndex((img) => img._id.toString() === req.params.imageId)

    if (imageIndex === -1) {
      return next(new AppError("Không tìm thấy hình ảnh", 404))
    }

    // Xóa hình ảnh từ server
    const imagePath = path.join(__dirname, "../../public/uploads/cars", car.images[imageIndex].filename)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }

    // Xóa hình ảnh khỏi mảng
    car.images.splice(imageIndex, 1)
    await car.save()

    res.status(200).json({
      success: true,
      message: "Hình ảnh đã được xóa thành công",
      data: car,
    })
  } catch (error) {
    next(error)
  }
}
