import { authService } from '../services/authService.js';

export const authController = {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.json({
        success: true,
        message: 'Đăng nhập thành công!',
        data: result
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  },

  async getMe(req, res, next) {
    try {
      const profile = await authService.getProfile(req.user.id);
      res.json({
        success: true,
        data: profile
      });
    } catch (err) {
      next(err);
    }
  },

  async createUser(req, res, next) {
    try {
      const newUser = await authService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: 'Tạo tài khoản mới thành công!',
        data: newUser
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const users = await authService.getAllUsers();
      res.json({
        success: true,
        data: users
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      if (id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Không thể tự xóa tài khoản của chính mình đang đăng nhập.'
        });
      }
      await authService.deleteUser(id);
      res.json({
        success: true,
        message: 'Đã xóa tài khoản người dùng thành công.'
      });
    } catch (err) {
      next(err);
    }
  }
};
