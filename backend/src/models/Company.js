import mongoose from 'mongoose';

// Nội dung bám theo AN ĐÔNG _ BRAND PROFILE.pdf do An Đông Food cung cấp.
const companySchema = new mongoose.Schema({
  name: { type: String, default: 'CÔNG TY TNHH AN ĐÔNG FOOD' },
  shortName: { type: String, default: 'AN ĐÔNG FOOD' },
  slogan: { type: String, default: 'An Đông, gửi trọn an lòng' },
  brandStory: {
    title: { type: String, default: 'Câu Chuyện Thương Hiệu An Đông' },
    meaning: { type: String, default: '' },
    content: { type: String, default: '' },
    quote: { type: String, default: '' }
  },
  vision: { type: String, default: '' },
  mission: { type: String, default: '' },
  brandPromise: { type: String, default: '' },
  positioning: [{ type: String }],
  toneOfVoice: [{ type: String }],
  contact: {
    address: String,
    addressEn: String,
    hotline: String,
    email: String,
    website: String
  }
}, {
  timestamps: true
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);
export default Company;
