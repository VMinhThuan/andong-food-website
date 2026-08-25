import { productService } from '../services/productService.js';
import { qrService } from '../services/qrService.js';

export const productController = {
  async getAll(req, res, next) {
    try {
      const products = await productService.getAllProducts(req.query);
      res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (err) {
      next(err);
    }
  },

  async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const product = await productService.getProductBySlug(slug);
      
      // Also generate live QR code dataURL for convenient rendering
      const qrDataUrl = await qrService.generateDataURL(
        product.qrCodeString || `${req.protocol}://${req.get('host')}/san-pham/${product.slug}`
      );

      res.json({
        success: true,
        data: {
          ...product,
          qrCodeDataUrl: qrDataUrl
        }
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message
      });
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      res.json({
        success: true,
        data: product
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message
      });
    }
  },

  async create(req, res, next) {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        message: 'Thêm sản phẩm mới thành công!',
        data: newProduct
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await productService.updateProduct(id, req.body);
      res.json({
        success: true,
        message: 'Cập nhật sản phẩm thành công!',
        data: updated
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(id);
      res.json({
        success: true,
        ...result
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
};
