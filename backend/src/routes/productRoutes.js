import { Router } from 'express';
import { productController } from '../controllers/productController.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/slug/:slug', productController.getBySlug);
router.get('/:id', productController.getById);

// The admin portal is the single place that can change the product catalogue.
router.post('/', authenticateToken, requireAdmin, productController.create);
router.put('/:id', authenticateToken, requireAdmin, productController.update);

// Only Admin can delete products
router.delete('/:id', authenticateToken, requireAdmin, productController.delete);

export default router;
