import { categoryModel } from '../models/categoryModel.js';

export const categoryController = {
  async getAll(req, res, next) {
    try {
      const categories = await categoryModel.findAll();
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const newCat = await categoryModel.create(req.body);
      res.status(201).json({ success: true, message: 'Thêm danh mục thành công!', data: newCat });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const updated = await categoryModel.update(req.params.id, req.body);
      res.json({ success: true, message: 'Cập nhật danh mục thành công!', data: updated });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await categoryModel.delete(req.params.id);
      res.json({ success: true, message: 'Xóa danh mục thành công!' });
    } catch (err) {
      next(err);
    }
  }
};
