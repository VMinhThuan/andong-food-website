import { Router } from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import contactRoutes from './contactRoutes.js';
import companyRoutes from './companyRoutes.js';
import qrRoutes from './qrRoutes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/contacts', contactRoutes);
apiRouter.use('/company', companyRoutes);
apiRouter.use('/qr', qrRoutes);

apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'An Dong Food MVC API Service',
    time: new Date().toISOString()
  });
});

export default apiRouter;
