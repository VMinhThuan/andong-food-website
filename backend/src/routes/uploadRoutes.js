import { Router } from 'express';
import { uploadController } from '../controllers/uploadController.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/product-image', authenticateToken, requireAdmin, uploadController.uploadProductImage);

export default router;
