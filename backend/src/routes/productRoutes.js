import { Router } from 'express';
import { productController } from '../controllers/productController.js';
import { authenticateToken, requireStaffOrAdmin, requireAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/slug/:slug', productController.getBySlug);
router.get('/:id', productController.getById);

// Staff or Admin can add / edit products
router.post('/', authenticateToken, requireStaffOrAdmin, productController.create);
router.put('/:id', authenticateToken, requireStaffOrAdmin, productController.update);

// Only Admin can delete products
router.delete('/:id', authenticateToken, requireAdmin, productController.delete);

export default router;
