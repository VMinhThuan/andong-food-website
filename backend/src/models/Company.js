import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, default: 'CÔNG TY TNHH THỰC PHẨM AN ĐÔNG (AN ĐÔNG FOOD)' },
  shortName: { type: String, default: 'AN ĐÔNG FOOD' },
  slogan: { type: String, default: 'Bình An Ở Phía Đông – Gạo Ngon Chuẩn Giống, Gửi Trọn An Lòng' },
  brandStory: {
    title: { type: String, default: 'Câu Chuyện Thương Hiệu An Đông' },
    meaning: { type: String, default: '“Đông” đại diện cho sự bền bỉ để đi qua những mùa khó khăn, còn “An” là sự bình an muốn dành cho người mình thương.' },
    content: { type: String, default: '' },
    concept: { type: String, default: 'Bình An Ở Phía Đông (An tâm – Organic – Lý tưởng)' }
  },
  vision: { type: String, default: '' },
  mission: { type: String, default: '' },
  brandPromise: [{ type: String }],
  coreValues: [
    {
      title: String,
      desc: String
    }
  ],
  contact: {
    address: String,
    hotline: String,
    email: String,
    website: String,
    zalo: String,
    facebook: String,
    workingHours: String
  }
}, {
  timestamps: true
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);
export default Company;
