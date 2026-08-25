import mongoose from 'mongoose';
import Company from './Company.js';
import { dbStore } from './store.js';

class CompanyModel {
  async getProfile() {
    if (mongoose.connection.readyState === 1) {
      const doc = await Company.findOne({}).lean();
      if (doc) return doc;
    }
    return dbStore.getItem('company');
  }

  async updateProfile(updates) {
    if (mongoose.connection.readyState === 1) {
      return await Company.findOneAndUpdate(
        {},
        { $set: updates },
        { new: true, upsert: true }
      ).lean();
    }

    const current = dbStore.getItem('company') || {};
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    dbStore.setItem('company', updated);
    return updated;
  }
}

export const companyModel = new CompanyModel();
