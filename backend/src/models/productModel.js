import mongoose from 'mongoose';
import Product from './Product.js';
import { dbStore } from './store.js';

class ProductModel {
  async findAll(filters = {}) {
    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (filters.category) {
        query.$or = [{ categoryId: filters.category }, { slug: filters.category }];
      }
      if (filters.featured !== undefined) {
        query.isFeatured = filters.featured === 'true' || filters.featured === true;
      }
      if (filters.search) {
        const regex = new RegExp(filters.search, 'i');
        query.$or = [
          { name: regex },
          { summary: regex },
          { code: regex }
        ];
      }
      return await Product.find(query).sort({ createdAt: -1 }).lean();
    }

    let products = dbStore.getCollection('products');
    if (filters.category) {
      products = products.filter(p => p.categoryId === filters.category || p.slug === filters.category);
    }
    if (filters.featured !== undefined) {
      const isFeatured = filters.featured === 'true' || filters.featured === true;
      products = products.filter(p => Boolean(p.isFeatured) === isFeatured);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.summary.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q)
      );
    }
    return products;
  }

  async findById(id) {
    if (mongoose.connection.readyState === 1) {
      return await Product.findOne({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] }).lean();
    }
    const products = dbStore.getCollection('products');
    return products.find(p => p.id === id) || null;
  }

  async findBySlug(slug) {
    if (mongoose.connection.readyState === 1) {
      return await Product.findOne({ slug: new RegExp(`^${slug}$`, 'i') }).lean();
    }
    const products = dbStore.getCollection('products');
    return products.find(p => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  async findByCode(code) {
    if (mongoose.connection.readyState === 1) {
      return await Product.findOne({ code: new RegExp(`^${code}$`, 'i') }).lean();
    }
    const products = dbStore.getCollection('products');
    return products.find(p => p.code.toLowerCase() === code.toLowerCase()) || null;
  }

  async create(productData) {
    const id = 'prod_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const code = productData.code || ('AD-' + Date.now().toString().slice(-4));
    const newProduct = {
      id,
      code,
      inStock: true,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      ...productData
    };

    if (mongoose.connection.readyState === 1) {
      return await Product.create(newProduct);
    }

    const products = dbStore.getCollection('products');
    products.push(newProduct);
    dbStore.setCollection('products', products);
    return newProduct;
  }

  async update(id, updates) {
    if (mongoose.connection.readyState === 1) {
      return await Product.findOneAndUpdate(
        { $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: updates },
        { new: true }
      ).lean();
    }

    const products = dbStore.getCollection('products');
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    dbStore.setCollection('products', products);
    return products[index];
  }

  async delete(id) {
    if (mongoose.connection.readyState === 1) {
      const res = await Product.deleteOne({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
      return res.deletedCount > 0;
    }

    const products = dbStore.getCollection('products');
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    dbStore.setCollection('products', filtered);
    return true;
  }
}

export const productModel = new ProductModel();
