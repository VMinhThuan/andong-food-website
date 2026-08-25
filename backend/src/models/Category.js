import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
