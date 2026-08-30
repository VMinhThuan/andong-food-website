import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userModel } from '../models/userModel.js';
import { JWT_SECRET } from '../config/constants.js';

class AuthService {
  async login(usernameOrEmail, password) {
    if (!usernameOrEmail || !password) {
      throw new Error('Vui lòng nhập đầy đủ tên đăng nhập/email và mật khẩu.');
    }

    const user = await userModel.findByUsername(usernameOrEmail) || await userModel.findByEmail(usernameOrEmail);
    if (!user) {
      throw new Error('Tài khoản hoặc mật khẩu không chính xác.');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error('Tài khoản hoặc mật khẩu không chính xác.');
    }

    const payload = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      user: payload
    };
  }

  async getProfile(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async createUser(data) {
    const existingUsername = await userModel.findByUsername(data.username);
    if (existingUsername) {
      throw new Error('Tên đăng nhập đã được sử dụng.');
    }
    const existingEmail = await userModel.findByEmail(data.email);
    if (existingEmail) {
      throw new Error('Email đã được sử dụng.');
    }

    const hashedPassword = bcrypt.hashSync(data.password, 10);
    return await userModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      fullName: data.fullName,
      role: data.role || 'staff',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
  }

  async getAllUsers() {
    return await userModel.findAll();
  }

  async deleteUser(id) {
    return await userModel.delete(id);
  }
}

export const authService = new AuthService();
