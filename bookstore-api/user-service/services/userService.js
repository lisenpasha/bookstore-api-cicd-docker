const axios = require('axios');
const users= require('./userData')
const { parse } = require('json2csv');


const fetchUsers = () => {
    return users
};

const fetchUserById = (id) => {
    const users = fetchUsers();
    return users.find(user => user.id === parseInt(id));
};

// Fetch book details from the book service
const fetchBooksDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8082/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
    }
  };

// Generate a CSV report for user book readings
  const generateCsvReport = async (csvHeaders) => {
    const books = await fetchBooksDetails();
    if (!books || books.length === 0) {
      throw new Error('No books data available');
    }

    const users = fetchUsers();
    if (!users || users.length === 0) {
      throw new Error('No users data available');
    }     

    const reportData = users.map(user => { // generate a userBookData json for each user
      // Find the book or set a default value if bookId is missing or that book is not found
      const book = (user.bookId && books.find(b => b.id === user.bookId)) ?? { name: 'Unknown', totalPages: 0 };
      const pagesRead = book.totalPages * user.percentageRead;
      const userBookData = {};
      csvHeaders.forEach(header => { // Populate userBookData with values from user and book based on csvHeaders
        userBookData[header] = 
          header === 'User Id' ? user.id :
          header === 'First Name' ? user.firstName :
          header === 'Last Name' ? user.lastName :
          header === 'Date' ? user.date :
          header === 'Book' ? book.name :
          header === 'Pages Read' ? pagesRead :
          '';
      });
  
      return userBookData;
    });

     
  
    // Convert JSON data to CSV format
    const csv = parse(reportData, { fields: csvHeaders }); 
    return csv;
  };

  module.exports = { fetchUsers, fetchUserById, generateCsvReport };
