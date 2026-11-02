
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const Book = require("../models/Book");

// 1. GET - Get all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. GET - Get book by ID
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 3. POST - Add a new book
router.post("/",authMiddleware, async (req, res) => {
    try {
        const newBook = new Book(req.body);

        const savedBook = await newBook.save();

        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. PUT - Update a book
router.put("/:id",authMiddleware, async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. DELETE - Delete a book
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
