const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // ✅ Import the path module
const authRoutes = require("./routes/auth"); // Auth Routes
const todoRoutes = require("./routes/todoRoutes");
const linkRoutes = require("./routes/linkRoutes");
const planRoutes = require("./routes/planRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const passwordRoutes = require("./routes/passwordRoutes"); // ✅ No duplicate import
const cardRoutes = require("./routes/cardRoutes"); // ✅ No duplicate import


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ Now it works!


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/passwords", passwordRoutes);
app.use("/api/cards", cardRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
