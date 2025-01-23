import express from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import path from 'path';
import axios from 'axios';
import cors from 'cors';
import http from 'http';

dotenv.config();



const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/dist')));

// Job search route





// Route to save interview dat
// Message route



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
