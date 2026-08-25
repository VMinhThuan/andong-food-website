import { companyModel } from '../models/companyModel.js';

export const companyController = {
  getProfile(req, res, next) {
    try {
      const profile = companyModel.getProfile();
      res.json({
        success: true,
        data: profile
      });
    } catch (err) {
      next(err);
    }
  },

  updateProfile(req, res, next) {
    try {
      const updated = companyModel.updateProfile(req.body);
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
