import { Router } from 'express';
import { categoryController } from '../controllers/categoryController.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', categoryController.getAll);
router.post('/', authenticateToken, requireAdmin, categoryController.create);
router.put('/:id', authenticateToken, requireAdmin, categoryController.update);
router.delete('/:id', authenticateToken, requireAdmin, categoryController.delete);

export default router;
