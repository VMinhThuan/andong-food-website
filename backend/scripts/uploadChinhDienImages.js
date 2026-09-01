import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import Product from '../src/models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function main() {
  console.log('--- UPLOADING CHINH DIEN IMAGES TO CLOUDINARY ---');
  
  const stPath = path.resolve(__dirname, '../../frontend/src/assets/brand/ST_CHÍNH DIỆN.svg');
  const vtPath = path.resolve(__dirname, '../../frontend/src/assets/brand/VT_CHÍNH DIỆN.svg');

  console.log('Uploading ST25 Chính Diện image...');
  const stRes = await cloudinary.uploader.upload(stPath, {
    folder: 'andong_food/products',
    resource_type: 'image',
    public_id: 'chinh-dien-st25'
  });
  console.log('ST25 Chính Diện uploaded successfully:', stRes.secure_url);

  console.log('Uploading Vuông Tôm Chính Diện image...');
  const vtRes = await cloudinary.uploader.upload(vtPath, {
    folder: 'andong_food/products',
    resource_type: 'image',
    public_id: 'chinh-dien-vuongtom'
  });
  console.log('Vuông Tôm Chính Diện uploaded successfully:', vtRes.secure_url);

  // Update database.json
  const dbJsonPath = path.resolve(__dirname, '../src/data/database.json');
  if (fs.existsSync(dbJsonPath)) {
    const raw = fs.readFileSync(dbJsonPath, 'utf-8');
    const dbData = JSON.parse(raw);
    if (dbData.products) {
      dbData.products = dbData.products.map(p => {
        if (p.slug === 'gao-st25' || p.code === 'AD-ST25-01') {
          p.images = p.images || {};
          p.images.chinhDien = stRes.secure_url;
        } else if (p.slug === 'gao-vuong-tom' || p.code === 'AD-VT-02') {
          p.images = p.images || {};
          p.images.chinhDien = vtRes.secure_url;
        }
        return p;
      });
      fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf-8');
      console.log('Updated database.json with Cloudinary chinhDien URLs');
    }
  }

  // Update MongoDB
  if (process.env.MONGODB_URI) {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.updateOne(
      { $or: [{ slug: 'gao-st25' }, { code: 'AD-ST25-01' }] },
      { $set: { 'images.chinhDien': stRes.secure_url } }
    );
    console.log('Updated MongoDB ST25 with chinhDien URL');

    await Product.updateOne(
      { $or: [{ slug: 'gao-vuong-tom' }, { code: 'AD-VT-02' }] },
      { $set: { 'images.chinhDien': vtRes.secure_url } }
    );
    console.log('Updated MongoDB Vuông Tôm with chinhDien URL');

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }

  console.log('--- COMPLETED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error('Error during upload:', err);
  process.exit(1);
});
