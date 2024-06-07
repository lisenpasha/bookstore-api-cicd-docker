const { fetchBooks, fetchBookById } = require('../services/bookService');

const getBooks = (req, res) => {
    const books = fetchBooks();
    res.json(books);
};

const getBookById = (req, res) => {
    const book = fetchBookById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book with that id not found' });
    }
};

module.exports = { getBooks, getBookById };
