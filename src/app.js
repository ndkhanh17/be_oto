const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const routes = require("./routes")
const errorMiddleware = require("./middlewares/error.middleware")
const config = require("./config/database")

// Khởi tạo app Express
const app = express()

// Kết nối database
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Middleware
app.use(cors()) // Thêm CORS middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files
app.use(express.static(path.join(__dirname, "../public")))

// Routes
app.use("/api", routes)

// Error handling middleware
app.use(errorMiddleware)

module.exports = app
