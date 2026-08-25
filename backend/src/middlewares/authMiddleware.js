import jwt from 'jsonwebtoken';
import { JWT_SECRET, USER_ROLES } from '../config/constants.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Yêu cầu đăng nhập để truy cập tài nguyên này.'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Phiên đăng nhập đã hết hạn hoặc token không hợp lệ.'
      });
    }
    req.user = user;
    next();
  });
}

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== USER_ROLES.ADMIN) {
    return res.status(403).json({
      success: false,
      message: 'Chức năng này chỉ dành riêng cho tài khoản Quản trị viên (Admin).'
    });
  }
  next();
}

export function requireStaffOrAdmin(req, res, next) {
  if (!req.user || (req.user.role !== USER_ROLES.ADMIN && req.user.role !== USER_ROLES.STAFF)) {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền truy cập chức năng này.'
    });
  }
  next();
}
