const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      message: "Invalid or missing authentication token",
    });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({
      message: "Validation error",
      errors: messages,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      message: `A record with this ${field} already exists`,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  return res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

module.exports = { errorHandler, notFoundHandler };
