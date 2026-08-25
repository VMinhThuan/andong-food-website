import { categoryModel } from '../models/categoryModel.js';

export const categoryController = {
  getAll(req, res, next) {
    try {
      const categories = categoryModel.findAll();
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  },

  create(req, res, next) {
    try {
      const newCat = categoryModel.create(req.body);
      res.status(201).json({ success: true, message: 'Thêm danh mục thành công!', data: newCat });
    } catch (err) {
      next(err);
    }
  },

  update(req, res, next) {
    try {
      const updated = categoryModel.update(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật danh mục thành công!', data: updated });
    } catch (err) {
      next(err);
    }
  },

  delete(req, res, next) {
    try {
      categoryModel.delete(req.params.id);
      res.json({ success: true, message: 'Xóa danh mục thành công!' });
    } catch (err) {
      next(err);
    }
  }
};
