import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  code: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  categoryId: { type: String, default: '' },
  categoryName: { type: String, default: 'Gạo Đặc Sản' },
  tagline: { type: String, default: '' },
  summary: { type: String, default: '' },
  price: { type: Number, default: 0 },
  unit: { type: String, default: 'kg' },
  packSizes: [{ type: String }],
  packaging: { type: String, default: '' },
  expiry: { type: String, default: '12 tháng' },
  origin: {
    location: { type: String, default: '' },
    soil: { type: String, default: '' },
    farmerCoop: { type: String, default: '' },
    harvestSeason: { type: String, default: '' }
  },
  specs: {
    variety: { type: String, default: '' },
    purity: { type: String, default: '' },
    moisture: { type: String, default: '' },
    brokenRate: { type: String, default: '' },
    preservatives: { type: String, default: '' }
  },
  tasteProfile: {
    aroma: { type: String, default: '' },
    texture: { type: String, default: '' },
    taste: { type: String, default: '' }
  },
  processSteps: [
    {
      step: Number,
      title: String,
      desc: String
    }
  ],
  cookingGuide: {
    waterRatio: String,
    washingTips: String,
    cookingTips: String
  },
  storageGuide: { type: String, default: '' },
  certifications: [
    {
      name: String,
      code: String,
      authority: String
    }
  ],
  images: {
    main: { type: String, default: '' },
    back: { type: String, default: '' },
    banner: { type: String, default: '' },
    field: { type: String, default: '' },
    detail: { type: String, default: '' }
  },
  qrCodeString: { type: String, default: '' },

  // --- Nội dung theo bao bì đã duyệt ---
  nameEn: { type: String, default: '' },
  summaryEn: { type: String, default: '' },
  ingredients: { type: String, default: '' },
  ingredientsEn: { type: String, default: '' },
  declarationNo: { type: String, default: '' },   // Số tự công bố (NĐ 15/2018)
  netWeight: { type: String, default: '' },       // Khối lượng tịnh (NĐ 43/2017)
  barcode: { type: String, default: '' },         // Chỉ điền mã do GS1 Việt Nam cấp
  expiryEn: { type: String, default: '' },
  storageGuideEn: { type: String, default: '' },
  notice: { type: String, default: '' },
  noticeEn: { type: String, default: '' },
  originCountry: { type: String, default: '' },
  originCountryEn: { type: String, default: '' },
  nutrition: {
    basis: { type: String, default: '100 g' },
    energy: { type: String, default: '' },
    protein: { type: String, default: '' },
    fat: { type: String, default: '' },
    carbohydrate: { type: String, default: '' },
    needsLabReview: { type: Boolean, default: false }
  },
  cookingSteps: [
    {
      step: Number,
      titleVi: String,
      descVi: String,
      titleEn: String,
      descEn: String
    }
  ],
  manufacturer: {
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    addressEn: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    taxCode: { type: String, default: '' }
  },
  isFeatured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true
});

productSchema.index({ slug: 1, code: 1, name: 'text', summary: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
