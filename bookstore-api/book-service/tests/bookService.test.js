const { fetchBooks, fetchBookById } = require('../services/bookService');
const books= require('../services/bookData')

describe('Book Service Tests', () => {
  test('should fetch all books', () => {
    const fetchedBooks = fetchBooks();
    expect(fetchedBooks).toBeDefined();
    expect(books.length).toBe(fetchedBooks.length); // Assuming there are the same number of books in the mock data
  });

  test('should fetch book by ID', () => {
    const book = fetchBookById(1);
    expect(book).toBeDefined();
    expect(book.id).toBe(1);
  });

  test('should return undefined for non-existing book ID', () => {
    const book = fetchBookById(999);
    expect(book).toBeUndefined();
  });
});
