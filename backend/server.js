const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
    res.send("🚀 Portfolio Backend Running Successfully");
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on Port ${PORT}`);
}).on("error", (error) => {
    console.error("Server failed to start:", error.message);
    process.exit(1);
});
