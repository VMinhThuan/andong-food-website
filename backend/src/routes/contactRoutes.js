import { Router } from 'express';
import { contactController } from '../controllers/contactController.js';
import { authenticateToken, requireStaffOrAdmin, requireAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Public: Submit contact form
router.post('/', contactController.create);

// Staff or Admin: View contacts and update processing status
router.get('/', authenticateToken, requireStaffOrAdmin, contactController.getAll);
router.patch('/:id/status', authenticateToken, requireStaffOrAdmin, contactController.updateStatus);

// Admin only: Delete contact log
router.delete('/:id', authenticateToken, requireAdmin, contactController.delete);

export default router;
