import { Router } from 'express';
import { companyController } from '../controllers/companyController.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', companyController.getProfile);
router.put('/', authenticateToken, requireAdmin, companyController.updateProfile);

export default router;
