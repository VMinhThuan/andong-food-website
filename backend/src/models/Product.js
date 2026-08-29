import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  code: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  categoryId: { type: String, default: '' },
  categoryName: { type: String, default: '' },
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
    main: { type: String, default: '/assets/product-gao.png' },
    front: { type: String, default: '' },
    back: { type: String, default: '' },
    banner: { type: String, default: '/assets/banner-gao-3.png' },
    field: { type: String, default: '/assets/banner-gao-2.png' },
    detail: { type: String, default: '/assets/banner-gao.png' }
  },
  qrCodeString: { type: String, default: '' },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  nameEn: { type: String, default: '' },
  summaryEn: { type: String, default: '' },
  ingredients: { type: String, default: '' },
  ingredientsEn: { type: String, default: '' },
  declarationNo: { type: String, default: '' },
  barcode: { type: String, default: '' },
  expiryEn: { type: String, default: '' },
  storageGuideEn: { type: String, default: '' },
  notice: { type: String, default: '' },
  noticeEn: { type: String, default: '' },
  originCountry: { type: String, default: '' },
  originCountryEn: { type: String, default: '' },
  nutrition: { type: mongoose.Schema.Types.Mixed, default: {} },
  cookingSteps: { type: mongoose.Schema.Types.Mixed, default: [] },
  manufacturer: { type: mongoose.Schema.Types.Mixed, default: {} },
  isFeatured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true
});

productSchema.index({ slug: 1, code: 1, name: 'text', summary: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
