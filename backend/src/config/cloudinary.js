import { v2 as cloudinary } from 'cloudinary';

const requiredKeys = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];

export function isCloudinaryConfigured() {
  return requiredKeys.every((key) => Boolean(process.env[key]));
}

export function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary chưa được cấu hình. Hãy thêm CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY và CLOUDINARY_API_SECRET.');
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

  return cloudinary;
}
