const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse incoming JSON requests

app.use('/api', userRoutes);  // API routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
