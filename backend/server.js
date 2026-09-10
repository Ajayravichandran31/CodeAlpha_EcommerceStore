const express = require("express");

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});