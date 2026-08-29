import { companyModel } from '../models/companyModel.js';

export const companyController = {
  async getProfile(req, res, next) {
    try {
      const profile = await companyModel.getProfile();
      res.json({
        success: true,
        data: profile
      });
    } catch (err) {
      next(err);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const updated = await companyModel.updateProfile(req.body);
      res.json({
        success: true,
        message: 'Cập nhật thông tin doanh nghiệp thành công!',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
};
