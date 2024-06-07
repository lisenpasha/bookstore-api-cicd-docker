const books = require('./bookData.js');
const fetchBooks = () => {
    return books
}

const fetchBookById = (id) => {
    const books = fetchBooks();
    return books.find(book => book.id === parseInt(id));
};

module.exports = { fetchBooks, fetchBookById };