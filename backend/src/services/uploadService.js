import { getCloudinary } from '../config/cloudinary.js';

const MAX_IMAGE_SIZE_BYTES = 6 * 1024 * 1024;
const IMAGE_DATA_URL = /^data:image\/(jpeg|jpg|png|webp|svg\+xml);base64,/i;

export const uploadService = {
  async uploadProductImage(dataUrl, fileName = 'product') {
    if (typeof dataUrl !== 'string' || !IMAGE_DATA_URL.test(dataUrl)) {
      throw new Error('Chỉ chấp nhận ảnh JPG, PNG, WebP hoặc SVG.');
    }

    const base64 = dataUrl.split(',')[1] || '';
    const size = Buffer.byteLength(base64, 'base64');
    if (size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error('Ảnh tối đa 6 MB. Vui lòng nén ảnh trước khi tải lên.');
    }

    const isSvg = /^data:image\/svg\+xml;base64,/i.test(dataUrl);
    const result = await getCloudinary().uploader.upload(dataUrl, {
      folder: 'andong-food/products',
      resource_type: 'image',
      public_id: fileName.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 80),
      overwrite: false,
      ...(isSvg ? {} : { transformation: [{ quality: 'auto', fetch_format: 'auto' }] })
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height
    };
  }
};
