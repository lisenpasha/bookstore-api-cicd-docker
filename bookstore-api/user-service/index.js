const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/users', userRoutes); // Use the user routes

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`User service running on http://localhost:${PORT}`);
});
