## Project Structure

The project is structured into two main services:
- User Service
- Book Service

Each service runs independently and can be developed and tested separately.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/lisenpasha/nodejs-bookstore-api.git
   cd bookstore-api
   ```

2. **Install Dependencies**

Install the root dependencies: 
    ```
   npm install
    ```

Then, navigate to each service directory and install dependencies:

    
    cd user-service
    npm install
    cd ../book-service
    npm install
    cd ..
    
### Alternatively, you can update the package.json file in the bookstore-api directory to the following configuration. This will allow you to run npm install once in the root directory, and it will automatically install dependencies for both the Book and User services:

    {
        "name": "bookstore-api",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "develop": "concurrently \"cd user-service && npm run develop\" \"cd book-service && npm run develop\"",
            "postinstall": "cd user-service && npm install && cd ../book-service && npm install"
        },
        "devDependencies": {
            "concurrently": "^6.2.1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC"
    }

3. **Running the Services**

You can run both services simultaneously using the concurrently package or run each service individually.

1-Using Concurrently

Run Both Services Simultaneously
    
    npm run develop

In the root directory of the project(bookstore-api),where the package.json with concurrently is located:
  
This command will start both the User Service on port 8081 and the Book Service on port 8082.

2-Running Each Service Individually On Seperated Terminals

1.User Service

    
    cd user-service
    npm run develop

This will start the User Service on port 8081.

2.Book Service

    
    cd book-service
    npm run develop

This will start the Book Service on port 8082.


4. **API Routes**

User Service (http://localhost:8081)

GET /users - Get all users

GET /users/:id - Get a user by ID

POST /users/export -Export user book readings as CSV (on Postman, after the response is loaded, click on "Save response to file" to download the response as a csv file.)

Book Service (http://localhost:8082)

GET /books - Get all books

GET /books/:id -  Get a book by ID

4. **Running Tests**

1-User Service Tests:

    cd user-service
    npm run test

2-Book Service Tests

    cd book-service
    npm run test


**Project Configuration**

The project configuration is managed through package.json files located in the root directory and each service directory.


**Conclusion**

By following the steps outlined in this README, you should be able to set up, run, and test the Bookstore API. The services are modular, making it easy to maintain and extend functionality.



----------Questions---------


**Answers to Questions**
1. How might you make this service more secure?

To make the Bookstore API more secure, we can focus on several concepts:
1. Protecting User Data: It's important to make sure that only authorized individuals have access to sensitive information. This can be done by implementing authentication methods, such as requiring users to log in with secure credentials or using token-based authentication mechanisms like JWT, which provide secure ways to verify a user's identity and permissions.

This way, we can ensure that each user can only access the data and perform the actions that they are authorized to, 
protecting sensitive information from unauthorized access.

2. Validating Inputs: We need to be cautious about the data coming into our system. Ensuring that all inputs are validated helps prevent malicious activities like injecting harmful code into our application.

3. Limiting Access: By implementing rate limiting, we can control how many requests a user can make in a given time frame. This helps prevent abuse, such as overloading the system with too many requests.

4. Keeping Secrets Safe: Storing sensitive information like passwords and API keys securely, and not exposing them in the code, is crucial. This helps prevent accidental leaks of important data.





How would you make this solution scale to millions of records?

To handle millions of records efficiently, we should consider several strategies:
1. Optimizing Data Storage: As our database grows, we need to ensure that it's organized in a way that allows for fast access. This can involve indexing important fields so that searches are quicker and splitting the database into smaller, more manageable pieces.

2. Using Caching: Creating temporary copies of frequently accessed data. This reduces the need to repeatedly fetch the same information from the database, speeding up the response time for users.

3. Balancing the Load: By distributing incoming requests across multiple servers, we can handle a larger number of users simultaneously. This prevents any single server from becoming a bottleneck.

4. Breaking Down the System: Splitting the application into smaller services allows us to scale each part independently. For example, the user service and the book service can run on separate servers and be scaled based on their specific needs.

5. Asynchronous Processing: For tasks that take a long time to complete, like generating large reports, we can handle them in the background without making users wait or server froze. This keeps the system responsive.

6. Efficient Data Retrieval: Instead of trying to fetch huge amounts of data at once, we can use techniques like pagination to load data in chunks. This makes the system more efficient and user-friendly.





