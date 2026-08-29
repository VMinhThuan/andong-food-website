import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/apiRouter.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
app.use('/assets', express.static(path.join(__dirname, '../../asset')));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Chào mừng đến với Hệ Thống API An Đông',
    version: '1.0.0',
    documentation: '/api/health',
    brand: 'An Đông - Bình An Ở Phía Đông'
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
