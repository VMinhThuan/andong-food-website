import mongoose from 'mongoose';
import Category from './Category.js';
import { dbStore } from './store.js';

class CategoryModel {
  async findAll() {
    if (mongoose.connection.readyState === 1) {
      return await Category.find({}).sort({ order: 1 }).lean();
    }
    return dbStore.getCollection('categories');
  }

  async findById(id) {
    if (mongoose.connection.readyState === 1) {
      return await Category.findOne({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] }).lean();
    }
    const categories = dbStore.getCollection('categories');
    return categories.find(c => c.id === id) || null;
  }

  async create(data) {
    const id = 'cat_' + Date.now().toString(36);
    const newCat = { id, order: Date.now(), ...data };

    if (mongoose.connection.readyState === 1) {
      return await Category.create(newCat);
    }

    const categories = dbStore.getCollection('categories');
    categories.push(newCat);
    dbStore.setCollection('categories', categories);
    return newCat;
  }

  async update(id, updates) {
    if (mongoose.connection.readyState === 1) {
      return await Category.findOneAndUpdate(
        { $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: updates },
        { new: true }
      ).lean();
    }

    const categories = dbStore.getCollection('categories');
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    categories[index] = { ...categories[index], ...updates };
    dbStore.setCollection('categories', categories);
    return categories[index];
  }

  async delete(id) {
    if (mongoose.connection.readyState === 1) {
      const res = await Category.deleteOne({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
      return res.deletedCount > 0;
    }

    const categories = dbStore.getCollection('categories');
    const filtered = categories.filter(c => c.id !== id);
    if (filtered.length === categories.length) return false;
    dbStore.setCollection('categories', filtered);
    return true;
  }
}

export const categoryModel = new CategoryModel();
