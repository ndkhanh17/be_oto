const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const morgan = require("morgan")
const dotenv = require("dotenv")

// Load env vars
dotenv.config()

// Import routes
const routes = require("./routes")

// Import error middleware
const errorHandler = require("./middlewares/error.middleware")

// Create Express app
const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Enable CORS
app.use(cors())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Set static folder
app.use(express.static(path.join(__dirname, "../public")))

// Mount routes
app.use("/api", routes)

// Error handler middleware
app.use(errorHandler)

module.exports = app
