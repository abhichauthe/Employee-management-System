const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/employees', require('./routes/employees'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
