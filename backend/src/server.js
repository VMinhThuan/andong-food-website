import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/apiRouter.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { PORT } from './config/constants.js';
import { connectDB } from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Static assets (if needed)
app.use('/assets', express.static(path.join(__dirname, '../../asset')));

// API Root
app.use('/api', apiRouter);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    message: 'Chào mừng đến với Hệ Thống API An Đông Food',
    version: '1.0.0',
    documentation: '/api/health',
    brand: 'An Đông Food - Bình An Ở Phía Đông'
  });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🌾 An Đông Food Backend Server running at: http://localhost:${PORT}`);
    console.log(`🌾 API Root: http://localhost:${PORT}/api`);
    console.log(`🌾 Database: MongoDB (with Mongoose Models & Auto-Seed)`);
    console.log(`🌾 Roles: Admin (admin / admin123), Staff (nhanvien / staff123)`);
    console.log(`====================================================`);
  });
});
