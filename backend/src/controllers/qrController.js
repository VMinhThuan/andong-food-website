import { qrService } from '../services/qrService.js';
import { productModel } from '../models/productModel.js';
import { CLIENT_URL } from '../config/constants.js';

const getProductQrTarget = (req, slug) => {
  const requestedSiteUrl = typeof req.query.siteUrl === 'string' ? req.query.siteUrl.trim() : '';
  const siteUrl = /^https?:\/\//i.test(requestedSiteUrl) ? requestedSiteUrl.replace(/\/$/, '') : CLIENT_URL;
  return `${siteUrl}/san-pham/${slug}`;
};

export const qrController = {
  /**
   * Generates live QR preview as JSON dataURL
   */
  async generateCode(req, res, next) {
    try {
      const { text, darkColor, lightColor, width } = req.query;
      const targetText = text || CLIENT_URL;
      const dataUrl = await qrService.generateDataURL(targetText, {
        darkColor,
        lightColor,
        width: width ? parseInt(width, 10) : 400
      });

      res.json({
        success: true,
        targetUrl: targetText,
        qrCodeDataUrl: dataUrl
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Generates QR for a specific product by slug
   */
  async generateProductQR(req, res, next) {
    try {
      const { slug } = req.params;
      const product = productModel.findBySlug(slug) || productModel.findByCode(slug);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm.' });
      }

      const qrTarget = getProductQrTarget(req, product.slug);
      const dataUrl = await qrService.generateDataURL(qrTarget, {
        width: req.query.width ? parseInt(req.query.width, 10) : 500
      });

      res.json({
        success: true,
        product: {
          id: product.id,
          name: product.name,
          code: product.code,
          slug: product.slug
        },
        targetUrl: qrTarget,
        qrCodeDataUrl: dataUrl
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Downloads high-resolution QR PNG for bag packaging printing
   */
  async downloadProductQRPNG(req, res, next) {
    try {
      const { slug } = req.params;
      const product = productModel.findBySlug(slug) || productModel.findByCode(slug);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm.' });
      }

      const qrTarget = getProductQrTarget(req, product.slug);
      const buffer = await qrService.generateBuffer(qrTarget, {
        width: 1200, // High-res for packaging printing
        margin: 2
      });

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="QR-AnDong-${product.slug}-print.png"`);
      res.send(buffer);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Downloads vector SVG QR for industrial printing
   */
  async downloadProductQRSVG(req, res, next) {
    try {
      const { slug } = req.params;
      const product = productModel.findBySlug(slug) || productModel.findByCode(slug);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm.' });
      }

      const qrTarget = getProductQrTarget(req, product.slug);
      const svgString = await qrService.generateSVG(qrTarget);

      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Content-Disposition', `attachment; filename="QR-AnDong-${product.slug}-vector.svg"`);
      res.send(svgString);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Verify QR Code scanned from packaging
   */
  async verifyCode(req, res, next) {
    try {
      const { code } = req.body;
      const product = qrService.verifyScannedCode(code);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Mã QR không khớp với sản phẩm chính hãng nào của An Đông.'
        });
      }

      res.json({
        success: true,
        message: 'Xác thực sản phẩm chính hãng An Đông thành công!',
        data: product
      });
    } catch (err) {
      next(err);
    }
  }
};
