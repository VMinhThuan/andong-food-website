import dotenv from 'dotenv';
import { PORT } from './config/constants.js';
import { connectDB } from './config/db.js';
import app from './app.js';

dotenv.config();

// Local development entrypoint. Vercel uses api/index.js instead.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🌾 An Đông Backend Server running at: http://localhost:${PORT}`);
    console.log(`🌾 API Root: http://localhost:${PORT}/api`);
    console.log(`🌾 Database: MongoDB (with Mongoose Models & Auto-Seed)`);
    console.log(`🌾 Roles: Admin and Staff authentication enabled`);
    console.log(`====================================================`);
  });
});
