const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { fetchUsers, fetchUserById, generateCsvReport } = require('../services/userService');
let books = require('../../book-service/services/bookData');
let users = require('../services/userData');

const mock = new MockAdapter(axios);
const original_books= books; //save a copy of original_books so we can revert back to prime state
const csvHeaders = ['User Id', 'First Name', 'Last Name', 'Date', 'Book', 'Pages Read'];

describe('User Service Tests', () => {

//afterEach function ensures that the mock.reset() method is called after each test case runs.
//prevents anything stored in the mock object of one test from affecting another test
  afterEach(() => {
    mock.reset();
  });

  test('should fetch all users', () => {
    const fetchedUsers = fetchUsers();
    expect(fetchedUsers).toBeDefined(); //to check if the value being tested is defined, it is not undefned.
    expect(fetchedUsers.length).toBe(users.length);// check that the number of fetched users matches the expected number of users

  });

  test('should fetch user by ID', () => {
    const user = fetchUserById(1);
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });

  test('should generate CSV report', async () => {
    // Mock book service response
    // Simulate a GET request to the specified URL and return the books array as the response
    mock.onGet('http://localhost:8082/books').reply(200, books);

    const csv = await generateCsvReport(csvHeaders);
    
    // Check the CSV content
    expect(csv).toContain("User Id","First Name","Last Name","Date","Book","Pages Read");
    expect(csv).toContain('1,"John","Doe","2021-01-01","To Kill a Mockingbird",100');
    expect(csv).toContain('2,"Jane","Smith","2021-02-01","1984",225');
  });

  test('should generate CSV report with missing bookId', async () => {
    // Mock book service response
    const mock_books = [
      { id: 1, name: 'Book One', totalPages: 300 },
      { id: 3, name: 'Book Two', totalPages: 400 },
    ];
    
    books=mock_books
    mock.onGet('http://localhost:8082/books').reply(200, books);

    const csv = await generateCsvReport(csvHeaders);

    // Check for user without bookId
    expect(csv).toContain('2,"Jane","Smith","2021-02-01","Unknown",0');
    books=original_books
  });

  test('should handle no books data available', async () => {
    books=[]
    mock.onGet('http://localhost:8082/books').reply(200, books);

    // Expect the generateCsvReport function to throw an error with the specified message
    await expect(generateCsvReport(csvHeaders)).rejects.toThrow('No books data available');
    books=original_books
  });

  test('should handle no users data available', async () => {
    const usersBackup = users;
    users.length = 0; // Clear users array
    
    mock.onGet('http://localhost:8082/books').reply(200, books);

    await expect(generateCsvReport(csvHeaders)).rejects.toThrow('No users data available');
    users=usersBackup; // Restore users array
  });
});
