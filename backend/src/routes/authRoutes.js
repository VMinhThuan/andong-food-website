import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', authController.login);
router.get('/me', authenticateToken, authController.getMe);
router.get('/users', authenticateToken, requireAdmin, authController.getAllUsers);
router.post('/users', authenticateToken, requireAdmin, authController.createUser);
router.delete('/users/:id', authenticateToken, requireAdmin, authController.deleteUser);

export default router;
