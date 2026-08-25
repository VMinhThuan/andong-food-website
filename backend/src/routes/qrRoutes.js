import { Router } from 'express';
import { qrController } from '../controllers/qrController.js';

const router = Router();

// Live generate QR dataUrl
router.get('/generate', qrController.generateCode);
router.get('/product/:slug', qrController.generateProductQR);

// Download High-Res PNG & Vector SVG for industrial packaging printing
router.get('/download/png/:slug', qrController.downloadProductQRPNG);
router.get('/download/svg/:slug', qrController.downloadProductQRSVG);

// Verify scanned code
router.post('/verify', qrController.verifyCode);

export default router;
