import { uploadService } from '../services/uploadService.js';

export const uploadController = {
  async uploadProductImage(req, res) {
    try {
      const image = await uploadService.uploadProductImage(req.body?.image, req.body?.fileName);
      res.status(201).json({ success: true, data: image });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message || 'Không thể tải ảnh lên Cloudinary.' });
    }
  }
};
