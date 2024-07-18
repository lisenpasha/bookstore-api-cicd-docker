# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the setup.sh script to the app directory
COPY setup.sh .

# Make the setup.sh script executable
RUN chmod +x setup.sh

# Copy the bookstore-api package.json and package-lock.json
COPY bookstore-api/package*.json ./bookstore-api/

# Install bookstore-api dependencies (if any)
WORKDIR /usr/src/app/bookstore-api
RUN npm install || true

# Copy the application source code
COPY . .

# Install dependencies for user-service
WORKDIR /usr/src/app/bookstore-api/user-service
COPY bookstore-api/user-service/package*.json ./
RUN npm install

# Install dependencies for book-service
WORKDIR /usr/src/app/bookstore-api/book-service
COPY bookstore-api/book-service/package*.json ./
RUN npm install

# Go back to the app root directory
WORKDIR /usr/src/app

# Expose the ports on which the services run
EXPOSE 8081 8082

# Run the setup script to start the services
CMD ["./setup.sh"]
