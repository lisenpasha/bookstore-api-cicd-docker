const express = require('express');
const { getBooks, getBookById } = require('../controllers/bookController');
const router = express.Router();

// Route to get all books
router.get('/', getBooks);

// Route to get a book by its ID
router.get('/:id', getBookById);

// Exporting the router to be used in other parts of the application
module.exports = router;
