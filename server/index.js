const express = require('express');
const cors = require('cors');

const alertRoutes = require('./routes/alertRoutes');
const bloodRoutes = require('./routes/bloodRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing application/json req.body

// Routes
app.use('/api', alertRoutes);    // Routes will be /api/alert and /api/alerts
app.use('/api', bloodRoutes);    // Routes will be /api/blood-request and /api/blood-requests

// Add root-level routes mapped as well to match exact requirements quickly
app.use('/', alertRoutes);
app.use('/', bloodRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Hospitality Crisis Server is running.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is successfully running on http://localhost:${PORT}`);
  console.log(`---------------------------------------------------------`);
  console.log(`Available Test Routes:`);
  console.log(` => POST http://localhost:${PORT}/alert`);
  console.log(` => GET  http://localhost:${PORT}/alerts`);
  console.log(` => POST http://localhost:${PORT}/blood-request`);
  console.log(` => GET  http://localhost:${PORT}/blood-requests`);
});
