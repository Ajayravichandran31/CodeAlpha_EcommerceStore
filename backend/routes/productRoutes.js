const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get product by ID
router.get("/:id", async (req, res) => {
    try {
        const [products] = await db.query(
            "SELECT * FROM products WHERE id = ?",
            [req.params.id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(products[0]);
    } catch (error) {
        console.error("Error fetching product:", error.message);

        res.status(500).json({
            message: "Failed to fetch product"
        });
    }
});
// Get all products
router.get("/", async (req, res) => {
    try {
        const [products] = await db.query("SELECT * FROM products");

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
});
// Add a new product
router.post("/", async (req, res) => {
    try {
        const { name, description, price, image_url, stock } = req.body;

        const [result] = await db.query(
            `INSERT INTO products 
            (name, description, price, image_url, stock)
            VALUES (?, ?, ?, ?, ?)`,
            [name, description, price, image_url, stock]
        );

        res.status(201).json({
            message: "Product added successfully",
            productId: result.insertId
        });
    } catch (error) {
        console.error("Error adding product:", error.message);

        res.status(500).json({
            message: "Failed to add product"
        });
    }
});
// Update a product
router.put("/:id", async (req, res) => {
    try {
        const { name, description, price, image_url, stock } = req.body;

        const [result] = await db.query(
            `UPDATE products
             SET name = ?, description = ?, price = ?, image_url = ?, stock = ?
             WHERE id = ?`,
            [name, description, price, image_url, stock, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error("Error updating product:", error.message);

        res.status(500).json({
            message: "Failed to update product"
        });
    }
});

// Delete a product
router.delete("/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM products WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting product:", error.message);

        res.status(500).json({
            message: "Failed to delete product"
        });
    }
});
module.exports = router;