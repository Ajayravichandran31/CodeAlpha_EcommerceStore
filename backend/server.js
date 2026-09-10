const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("CodeAlpha E-commerce Backend is running!");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "E-commerce API is working!"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const [result] = await db.query("SELECT 1 AS result");

        res.json({
            message: "MySQL database connected successfully!",
            result: result[0].result
        });
    } catch (error) {
        console.error("Database connection error:", error.message);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});