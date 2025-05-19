const express = require("express")
const router = express.Router()

// Import route files
const authRoutes = require("./auth.routes")
const carRoutes = require("./car.routes")
const userRoutes = require("./user.routes")
const dealershipRoutes = require("./dealership.routes")
const newsRoutes = require("./news.routes")
const uploadRoutes = require("./upload.routes")

// Mount routes
router.use("/auth", authRoutes)
router.use("/cars", carRoutes)
router.use("/users", userRoutes)
router.use("/dealerships", dealershipRoutes)
router.use("/news", newsRoutes)
router.use("/upload", uploadRoutes)

module.exports = router
