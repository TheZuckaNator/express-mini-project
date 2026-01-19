const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/express-api-db";

mongoose
  .connect(MONGODB_URI)
  .then((connection) => {
    console.log(`Connected to MongoDB: ${connection.connections[0].name}`);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
