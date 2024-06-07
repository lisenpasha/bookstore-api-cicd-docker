const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');

app.use('/books', bookRoutes);

const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Book service running on http://localhost:${PORT}`);
});
