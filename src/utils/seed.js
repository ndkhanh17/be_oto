const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const path = require("path")
const fs = require("fs")

// Load models
const User = require("../models/user.model")
const Car = require("../models/car.model")
const Dealership = require("../models/dealership.model")
const News = require("../models/news.model")

// Load env vars
dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Create uploads/cars directory if it doesn't exist
const carsUploadsDir = path.join(uploadsDir, "cars")
if (!fs.existsSync(carsUploadsDir)) {
  fs.mkdirSync(carsUploadsDir, { recursive: true })
}

// Create uploads/news directory if it doesn't exist
const newsUploadsDir = path.join(uploadsDir, "news")
if (!fs.existsSync(newsUploadsDir)) {
  fs.mkdirSync(newsUploadsDir, { recursive: true })
}

// Sample data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    phone: "0987654321",
    role: "admin",
  },
  {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    password: "password123",
    phone: "0901234567",
    role: "user",
  },
  {
    name: "Trần Thị B",
    email: "tranthib@example.com",
    password: "password123",
    phone: "0912345678",
    role: "user",
  },
]

const dealerships = [
  {
    name: "Toyota Hà Nội",
    brand: "Lexus",
    address: "Số 15 Phạm Hùng",
    city: "Hà Nội",
    state: "Hà Nội",
    zipCode: "100000",
    phone: "0987654321",
    email: "contact@toyotahanoi.com",
    website: "https://toyotahanoi.com",
    description: "Đại lý Toyota chính hãng tại Hà Nội",
  },
  {
    name: "Honda Sài Gòn",
    brand: "Lexus",
    address: "Số 123 Nguyễn Văn Linh",
    city: "Hồ Chí Minh",
    state: "Hồ Chí Minh",
    zipCode: "700000",
    phone: "0901234567",
    email: "contact@hondasaigon.com",
    website: "https://hondasaigon.com",
    description: "Đại lý Honda chính hãng tại TP.HCM",
  },
  {
    name: "Ford Đà Nẵng",
    brand: "Lexus",
    address: "Số 45 Nguyễn Tất Thành",
    city: "Đà Nẵng",
    state: "Đà Nẵng",
    zipCode: "550000",
    phone: "0923456789",
    email: "contact@forddanang.com",
    website: "https://forddanang.com",
    description: "Đại lý Ford chính hãng tại Đà Nẵng",
  },
]

const cars = [
  {
    title: "Toyota Camry 2023",
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    price: 35000,
    mileage: 0,
    fuel: "Gasoline",
    transmission: "Automatic",
    type: "Sedan",
    status: "New",
    description: "Toyota Camry đời mới nhất, full option, tiết kiệm nhiên liệu",
    features: ["Bluetooth", "Camera lùi", "Cảm biến đỗ xe", "Điều hòa tự động", "Màn hình cảm ứng"],
    seller: {
      name: "Toyota Hà Nội",
      phone: "0987654321",
      email: "contact@toyotahanoi.com",
    },
    images: [],
    featured: true,
  },
  {
    title: "Honda Civic 2023",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 28000,
    mileage: 0,
    fuel: "Gasoline",
    transmission: "Automatic",
    type: "Sedan",
    status: "New",
    description: "Honda Civic đời mới nhất, thiết kế hiện đại, tiết kiệm nhiên liệu",
    features: ["Bluetooth", "Camera lùi", "Cảm biến đỗ xe", "Điều hòa tự động", "Màn hình cảm ứng"],
    seller: {
      name: "Honda Sài Gòn",
      phone: "0901234567",
      email: "contact@hondasaigon.com",
    },
    images: [],
    featured: true,
  },
  {
    title: "Ford Ranger 2022",
    brand: "Ford",
    model: "Ranger",
    year: 2022,
    price: 32000,
    mileage: 5000,
    fuel: "Diesel",
    transmission: "Automatic",
    type: "Pickup",
    status: "Used",
    description: "Ford Ranger bán tải mạnh mẽ, đã qua sử dụng, còn rất mới",
    features: ["Bluetooth", "Camera lùi", "Cảm biến đỗ xe", "Điều hòa tự động", "Hệ thống định vị GPS"],
    seller: {
      name: "Ford Đà Nẵng",
      phone: "0923456789",
      email: "contact@forddanang.com",
    },
    images: [],
    featured: false,
  },
]

const news = [
  {
    title: "Thị trường ô tô Việt Nam tăng trưởng mạnh trong quý 2/2023",
    content:
      "Thị trường ô tô Việt Nam ghi nhận mức tăng trưởng ấn tượng trong quý 2 năm 2023. Theo số liệu từ Hiệp hội Các nhà sản xuất Ô tô Việt Nam (VAMA), doanh số bán hàng đã tăng 30% so với cùng kỳ năm ngoái. Các chuyên gia nhận định, sự tăng trưởng này đến từ nhiều yếu tố như: nhu cầu mua sắm tăng sau đại dịch, các chính sách hỗ trợ từ Chính phủ và các chương trình khuyến mãi hấp dẫn từ các hãng xe. Đặc biệt, phân khúc SUV và Crossover tiếp tục dẫn đầu thị trường với mức tăng trưởng vượt trội.",
    author: "Admin",
    tags: ["Thị trường", "Ô tô", "Việt Nam", "2023"],
    featured: true,
    image: null,
  },
  {
    title: "Top 5 mẫu xe SUV tiết kiệm nhiên liệu nhất năm 2023",
    content:
      "Với giá xăng dầu tăng cao, việc lựa chọn một mẫu xe SUV tiết kiệm nhiên liệu đang trở thành ưu tiên hàng đầu của nhiều người tiêu dùng. Dưới đây là top 5 mẫu xe SUV tiết kiệm nhiên liệu nhất năm 2023: 1. Toyota RAV4 Hybrid (5.7L/100km), 2. Honda CR-V Hybrid (6.0L/100km), 3. Kia Sportage Hybrid (6.2L/100km), 4. Hyundai Tucson Hybrid (6.3L/100km), 5. Ford Escape Hybrid (6.5L/100km). Các mẫu xe này không chỉ tiết kiệm nhiên liệu mà còn sở hữu nhiều tính năng hiện đại, đáp ứng nhu cầu sử dụng đa dạng của người tiêu dùng.",
    author: "Admin",
    tags: ["SUV", "Tiết kiệm nhiên liệu", "Top 5", "2023"],
    featured: true,
    image: null,
  },
  {
    title: "Xu hướng xe điện đang thay đổi ngành công nghiệp ô tô như thế nào?",
    content:
      "Xe điện đang dần trở thành xu hướng không thể đảo ngược trong ngành công nghiệp ô tô toàn cầu. Với sự phát triển của công nghệ pin, hạ tầng sạc và các chính sách hỗ trợ từ chính phủ, xe điện đang ngày càng trở nên phổ biến. Các hãng xe truyền thống như Volkswagen, Ford, GM đều đã công bố kế hoạch chuyển đổi sang sản xuất xe điện hoàn toàn trong tương lai. Tesla vẫn dẫn đầu thị trường với các mẫu xe như Model 3, Model Y. Tại Việt Nam, xe điện cũng đang dần được người tiêu dùng đón nhận với sự xuất hiện của VinFast và các hãng xe điện quốc tế.",
    author: "Admin",
    tags: ["Xe điện", "Công nghệ", "Xu hướng"],
    featured: false,
    image: null,
  },
]

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany()
    await Car.deleteMany()
    await Dealership.deleteMany()
    await News.deleteMany()

    console.log("Data cleared...")

    // Create users
    const createdUsers = []
    for (const user of users) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(user.password, salt)

      const newUser = await User.create({
        ...user,
        password: hashedPassword,
      })

      createdUsers.push(newUser)
    }

    console.log(`${createdUsers.length} users created`)

    // Create dealerships
    const createdDealerships = []
    for (const dealership of dealerships) {
      const newDealership = await Dealership.create({
        ...dealership,
        createdBy: createdUsers[0]._id, // Admin user
      })

      createdDealerships.push(newDealership)
    }

    console.log(`${createdDealerships.length} dealerships created`)

    // Create cars
    const createdCars = []
    for (const car of cars) {
      const newCar = await Car.create({
        ...car,
        createdBy: createdUsers[0]._id, // Admin user
      })

      createdCars.push(newCar)
    }

    console.log(`${createdCars.length} cars created`)

    // Create news
    const createdNews = []
    for (const newsItem of news) {
      const newNews = await News.create({
        ...newsItem,
        createdBy: createdUsers[0]._id, // Admin user
      })

      createdNews.push(newNews)
    }

    console.log(`${createdNews.length} news items created`)

    console.log("Data seeded successfully!")
    process.exit()
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
