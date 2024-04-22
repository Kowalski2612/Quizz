require("dotenv").config();
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors'); // Import cors middleware

const app = express();

// Initialize middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors()); // This will allow all origins. You can specify options if needed.

// Init db
require("./dbs/init.mongodb");

// Init routes
app.use("/", require("./routes"));

// Handling errors
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
    })
})

module.exports = app;
