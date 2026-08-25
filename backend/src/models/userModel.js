import mongoose from 'mongoose';
import User from './User.js';
import { dbStore } from './store.js';

class UserModel {
  async findAll() {
    if (mongoose.connection.readyState === 1) {
      return await User.find({}, '-password').lean();
    }
    const users = dbStore.getCollection('users');
    return users.map(({ password, ...u }) => u);
  }

  async findById(id) {
    if (mongoose.connection.readyState === 1) {
      return await User.findOne({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] }).lean();
    }
    const users = dbStore.getCollection('users');
    return users.find(u => u.id === id) || null;
  }

  async findByUsername(username) {
    if (mongoose.connection.readyState === 1) {
      return await User.findOne({ username: new RegExp(`^${username}$`, 'i') }).lean();
    }
    const users = dbStore.getCollection('users');
    return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
  }

  async findByEmail(email) {
    if (mongoose.connection.readyState === 1) {
      return await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).lean();
    }
    const users = dbStore.getCollection('users');
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async create(userData) {
    const id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const data = { id, ...userData, createdAt: new Date().toISOString() };

    if (mongoose.connection.readyState === 1) {
      const doc = await User.create(data);
      const obj = doc.toObject();
      delete obj.password;
      return obj;
    }

    const users = dbStore.getCollection('users');
    users.push(data);
    dbStore.setCollection('users', users);
    const { password, ...safeUser } = data;
    return safeUser;
  }

  async update(id, updates) {
    if (mongoose.connection.readyState === 1) {
      return await User.findOneAndUpdate(
        { $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: updates },
        { new: true, select: '-password' }
      ).lean();
    }

    const users = dbStore.getCollection('users');
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
    dbStore.setCollection('users', users);
    const { password, ...safeUser } = users[index];
    return safeUser;
  }

  async delete(id) {
    if (mongoose.connection.readyState === 1) {
      const res = await User.deleteOne({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
      return res.deletedCount > 0;
    }

    const users = dbStore.getCollection('users');
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) return false;
    dbStore.setCollection('users', filtered);
    return true;
  }
}

export const userModel = new UserModel();
