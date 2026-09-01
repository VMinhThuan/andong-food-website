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
  console.log('--- UPLOADING ECOM IMAGES TO CLOUDINARY ---');
  
  const st25Path = path.resolve(__dirname, '../../frontend/src/assets/brand/ecom-st25.svg');
  const vuongTomPath = path.resolve(__dirname, '../../frontend/src/assets/brand/ecom-vuongtom.svg');

  console.log('Uploading ST25 ecom image...');
  const st25Res = await cloudinary.uploader.upload(st25Path, {
    folder: 'andong_food/products',
    resource_type: 'image',
    public_id: 'ecom-st25'
  });
  console.log('ST25 uploaded successfully:', st25Res.secure_url);

  console.log('Uploading Vuông Tôm ecom image...');
  const vtRes = await cloudinary.uploader.upload(vuongTomPath, {
    folder: 'andong_food/products',
    resource_type: 'image',
    public_id: 'ecom-vuongtom'
  });
  console.log('Vuông Tôm uploaded successfully:', vtRes.secure_url);

  // Update database.json
  const dbJsonPath = path.resolve(__dirname, '../src/data/database.json');
  if (fs.existsSync(dbJsonPath)) {
    const raw = fs.readFileSync(dbJsonPath, 'utf-8');
    const dbData = JSON.parse(raw);
    if (dbData.products) {
      dbData.products = dbData.products.map(p => {
        if (p.slug === 'gao-st25' || p.code === 'AD-ST25-01') {
          p.images = p.images || {};
          p.images.ecom = st25Res.secure_url;
        } else if (p.slug === 'gao-vuong-tom' || p.code === 'AD-VT-02') {
          p.images = p.images || {};
          p.images.ecom = vtRes.secure_url;
        }
        return p;
      });
      fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf-8');
      console.log('Updated database.json with Cloudinary ecom URLs');
    }
  }

  // Update MongoDB
  if (process.env.MONGODB_URI) {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.updateOne(
      { $or: [{ slug: 'gao-st25' }, { code: 'AD-ST25-01' }] },
      { $set: { 'images.ecom': st25Res.secure_url } }
    );
    console.log('Updated MongoDB ST25 with ecom URL');

    await Product.updateOne(
      { $or: [{ slug: 'gao-vuong-tom' }, { code: 'AD-VT-02' }] },
      { $set: { 'images.ecom': vtRes.secure_url } }
    );
    console.log('Updated MongoDB Vuông Tôm with ecom URL');

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }

  console.log('--- COMPLETED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error('Error during upload:', err);
  process.exit(1);
});
