const { fetchUsers, fetchUserById, generateCsvReport } = require('../services/userService');

// Required keys for validation
const requiredHeaders = ['User Id', 'First Name', 'Last Name', 'Date', 'Book', 'Pages Read'];


// Controller function to get all users
const getUsers = (req, res) => {
  const users = fetchUsers();
  res.json(users);
};

// Controller function to get a user by ID
const getUserById = (req, res) => {
  const user = fetchUserById(req.params.id);
  if (user){
    res.json(user);
  }
  else{
    res.status(404).json({ message: 'User with that id not found' });
  }
  
};

// Controller function to handle CSV export
const exportUserReadings = async (req, res) => {
  try { 
    let { csvHeaders } = req.body; // Extract CSV headers from the request body
    if (!csvHeaders) {
      return res.status(400).send('CSV headers are required');
    } 
    //Create a list containing each word separated by the |. 
    
    csvHeaders=csvHeaders.split('|') //Considering the request body's format is : "|User Id|First Name|Last Name|Date|Book|Pages Read|"
    
    // Remove the first element
    csvHeaders.shift();

    // Remove the last element
    csvHeaders.pop();
    
    if (csvHeaders.length != 6) {
      return res.status(400).send('Invalid CSV headers format, it requires 6 headers');
    }

    //Validation: Check if each incoming header name is correct and in the required position before proceeding.
    const incorrectHeaders = csvHeaders.map((element, index) => {
      if (element !== requiredHeaders[index]) {
        return { actual: element, expected: requiredHeaders[index]};
      }
    }).filter(item => item !== undefined);
    
    if (incorrectHeaders.length > 0) {
      let response = '' //used so we can return all problematic headers.
      incorrectHeaders.forEach(header => {
        response +=`Incorrect header. Found "${header.actual}", but expected "${header.expected}".\n`;
      });
      return res.status(400).send(`Invalid CSV headers format, required format is: |User Id|First Name|Last Name|Date|Book|Pages Read|.
      Detailed:\n${response}`);
    }

    
    const csvReport = await generateCsvReport(csvHeaders); // Generate the CSV report
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="report.csv"');
    res.status(200).send(csvReport);
  } catch (error) {
    console.error('Error processing CSV report:', error);
    res.status(500).send('Error processing CSV report');
  }
};

module.exports = { getUsers, getUserById, exportUserReadings };
