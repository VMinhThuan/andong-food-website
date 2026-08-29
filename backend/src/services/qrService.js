import QRCode from 'qrcode';
import { QR_DEFAULT_OPTIONS, CLIENT_URL } from '../config/constants.js';
import { productModel } from '../models/productModel.js';

class QRService {
  /**
   * Generates a Data URL (base64 image) for a given product or custom text
   */
  async generateDataURL(text, options = {}) {
    const opts = {
      ...QR_DEFAULT_OPTIONS,
      ...options,
      color: {
        dark: options.darkColor || QR_DEFAULT_OPTIONS.color.dark,
        light: options.lightColor || QR_DEFAULT_OPTIONS.color.light
      }
    };
    return await QRCode.toDataURL(text, opts);
  }

  /**
   * Generates an SVG string of the QR Code (for high-res printing on bags)
   */
  async generateSVG(text, options = {}) {
    const opts = {
      ...QR_DEFAULT_OPTIONS,
      ...options,
      color: {
        dark: options.darkColor || QR_DEFAULT_OPTIONS.color.dark,
        light: options.lightColor || QR_DEFAULT_OPTIONS.color.light
      }
    };
    return await QRCode.toString(text, { ...opts, type: 'svg' });
  }

  /**
   * Generates a PNG Buffer for download
   */
  async generateBuffer(text, options = {}) {
    const opts = {
      ...QR_DEFAULT_OPTIONS,
      width: options.width || 600,
      ...options
    };
    return await QRCode.toBuffer(text, opts);
  }

  /**
   * Generates standard QR landing URL for a product
   */
  async getProductQRUrl(slugOrCode) {
    const product = await productModel.findBySlug(slugOrCode) || await productModel.findByCode(slugOrCode);
    if (!product) return null;
    return `${CLIENT_URL}/san-pham/${product.slug}`;
  }

  /**
   * Verifies scanned text / code and returns matching product info
   */
  async verifyScannedCode(codeOrUrl) {
    if (!codeOrUrl) return null;

    // Check if it's a URL ending in slug
    let target = codeOrUrl.trim();
    if (target.includes('/san-pham/')) {
      const parts = target.split('/san-pham/');
      const slug = parts[1].split(/[?#]/)[0];
      return await productModel.findBySlug(slug);
    }

    // Direct slug search
    const bySlug = await productModel.findBySlug(target);
    if (bySlug) return bySlug;

    // Direct product code search (e.g. AD-ST25-01)
    const byCode = await productModel.findByCode(target);
    if (byCode) return byCode;

    // Fuzzy search by name or summary
    const all = await productModel.findAll({ search: target });
    return all.length > 0 ? all[0] : null;
  }
}

export const qrService = new QRService();
