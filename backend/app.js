import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { connectDB } from './src/config/db.js';

const PORT = process.env.PORT || 5001;

// Khởi tạo kết nối MongoDB không chặn event loop (asynchronous startup)
connectDB().catch((err) => {
  console.error('❌ Database connection error on startup:', err.message);
});

// Lắng nghe trên PORT từ environment variable (Phusion Passenger / Local)
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌾 An Đông Backend Server running on port: ${PORT}`);
  console.log(`🌾 API Root: http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});

export default app;
