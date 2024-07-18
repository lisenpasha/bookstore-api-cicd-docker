#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Installing root dependencies..."
cd bookstore-api
npm install

echo "Installing user-service dependencies..."
cd user-service
npm install
cd ..

echo "Installing book-service dependencies..."
cd book-service
npm install
cd ..

echo "Running tests for user-service..."
cd user-service
npm run test
cd ..

echo "Running tests for book-service..."
cd book-service
npm run test
cd ..

echo "Starting user-service..."
cd user-service
npm run develop &
USER_SERVICE_PID=$!
cd ..

echo "Starting book-service..."
cd book-service
npm run develop &
BOOK_SERVICE_PID=$!
cd ..

echo "Waiting for services to start..."
sleep 10

echo "Both services are running. You can now use Postman to interact with the APIs."
echo "User Service: http://localhost:8081"
echo "Book Service: http://localhost:8082"
