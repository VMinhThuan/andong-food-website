/**
 * Nạp lại dữ liệu sản phẩm / danh mục / hồ sơ công ty từ seedData.js vào MongoDB.
 *
 * Cần thiết vì connectDB() chỉ seed khi collection còn rỗng — sau khi nội dung
 * trong seedData.js thay đổi, phải chạy script này để MongoDB nhận dữ liệu mới.
 *
 *   npm run reseed --prefix backend
 *
 * Script chỉ động vào products, categories và company.
 * Users và contacts được giữ nguyên.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Company from '../models/Company.js';
import { initialProducts, initialCategories, initialCompany } from '../data/seedData.js';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/andong_food';

async function reseed() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log(`Đã kết nối: ${mongoose.connection.host}/${mongoose.connection.name}`);

  const removedProducts = await Product.deleteMany({});
  await Product.insertMany(initialProducts);
  console.log(`Products: xoá ${removedProducts.deletedCount}, nạp ${initialProducts.length} → ${initialProducts.map(p => p.name).join(', ')}`);

  const removedCategories = await Category.deleteMany({});
  await Category.insertMany(initialCategories);
  console.log(`Categories: xoá ${removedCategories.deletedCount}, nạp ${initialCategories.length}`);

  await Company.deleteMany({});
  await Company.create(initialCompany);
  console.log(`Company: nạp lại hồ sơ ${initialCompany.name}`);

  await mongoose.disconnect();
  console.log('Xong.');
}

reseed().catch(err => {
  console.error('Reseed thất bại:', err.message);
  process.exit(1);
});
