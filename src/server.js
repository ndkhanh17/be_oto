const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const connectDB = require("./config/database")
const errorHandler = require("./middlewares/error.middleware")

// Load env vars
dotenv.config()

// Connect to database
connectDB()

// Initialize express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

// Routes
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/cars", require("./routes/car.routes"))
app.use("/api/users", require("./routes/user.routes"))
app.use("/api/dealerships", require("./routes/dealership.routes"))
app.use("/api/news", require("./routes/news.routes"))
// Set static folder
app.use(express.static(path.join(__dirname, '../public')));
// Error handler
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  process.exit(1)
})
