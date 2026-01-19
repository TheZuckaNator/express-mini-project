require("dotenv").config();
require("./config/db.config");

const express = require("express");
const cors = require("cors");

const { errorHandler, notFoundHandler } = require("./middleware/error.middleware");

const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
