import mongoose from 'mongoose';
import { initialUsers, initialCategories, initialProducts, initialCompany, initialContacts } from '../data/seedData.js';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/andong_food';
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`🌾 MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    
    // Seed initial data if collections are empty
    await seedInitialDatabase();
  } catch (error) {
    console.warn(`⚠️ Warning: Could not connect to MongoDB at ${uri} (${error.message}).`);
    console.log(`ℹ️ App will continue in fallback mode if MongoDB service is not started locally.`);
  }
}

async function seedInitialDatabase() {
  try {
    const { default: User } = await import('../models/User.js');
    const { default: Product } = await import('../models/Product.js');
    const { default: Category } = await import('../models/Category.js');
    const { default: Company } = await import('../models/Company.js');
    const { default: Contact } = await import('../models/Contact.js');

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(initialUsers);
      console.log('🌾 Seeded default users (admin & nhanvien) to MongoDB');
    }

    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      await Category.insertMany(initialCategories);
      console.log('🌾 Seeded categories to MongoDB');
    }

    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      await Product.insertMany(initialProducts);
      console.log('🌾 Seeded An Dong Food products (ST25, Nang Thom, etc.) to MongoDB');
    }

    const companyCount = await Company.countDocuments();
    if (companyCount === 0) {
      await Company.create(initialCompany);
      console.log('🌾 Seeded Company profile to MongoDB');
    }

    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.insertMany(initialContacts);
      console.log('🌾 Seeded Contacts to MongoDB');
    }
  } catch (err) {
    console.error('Error during auto-seed:', err.message);
  }
}
