const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

const insertAdmin = async () => {
  const existingAdmin = await User.findOne({ email: "admin@example.com" });

  if (existingAdmin) {
    console.log("⚠️ Admin user already exists.");
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const adminUser = new User({
    username: "admin",
    email: "admin@example.com",
    password: hashedPassword,  // ✅ Storing Hashed Password
    role: "admin"
  });

  await adminUser.save();
  console.log("✅ Admin User Inserted Successfully!");
  mongoose.disconnect();
};

insertAdmin();
