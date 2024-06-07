const express = require('express');
const { getUsers, getUserById, exportUserReadings } = require('../controllers/userController');
const router = express.Router();

// Route to get all users
router.get('/', getUsers);

// Route to get a user by ID
router.get('/:id', getUserById);

// Route to handle CSV export
router.post('/export', exportUserReadings);

module.exports = router;
