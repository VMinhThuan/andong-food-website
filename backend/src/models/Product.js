import mongoose from 'mongoose';

// Cấu trúc bám theo tài liệu An_Dong_Product_Content_Master.docx
// do An Đông Food cung cấp (song ngữ Việt - Anh).
const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  code: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  nameEn: { type: String, default: '' },
  slug: { type: String, required: true, unique: true, trim: true },
  categoryId: { type: String, default: '' },
  categoryName: { type: String, default: 'Gạo Trắng' },
  summary: { type: String, default: '' },
  summaryEn: { type: String, default: '' },
  shortDesc: { type: String, default: '' },
  cookingSteps: [
    {
      step: Number,
      title: String,
      desc: String,
      titleEn: String,
      descEn: String
    }
  ],
  nutrition: [
    {
      label: String,
      labelEn: String,
      value: String
    }
  ],
  info: {
    ingredients: { type: String, default: '' },
    ingredientsEn: { type: String, default: '' },
    expiry: { type: String, default: '' },
    declarationNo: { type: String, default: '' },
    storage: { type: String, default: '' },
    notice: { type: String, default: '' },
    origin: { type: String, default: 'Việt Nam' },
    barcode: { type: String, default: '' }
  },
  images: {
    main: { type: String, default: '/assets/product-gao.png' },
    banner: { type: String, default: '/assets/banner-gao-3.png' }
  },
  qrCodeString: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true
});

productSchema.index({ slug: 1, code: 1, name: 'text', summary: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
