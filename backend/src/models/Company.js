import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, default: 'CÔNG TY TNHH THỰC PHẨM AN ĐÔNG (An Đông)' },
  shortName: { type: String, default: 'An Đông' },
  slogan: { type: String, default: 'Bình An Ở Phía Đông – Gạo Ngon Chuẩn Giống, Gửi Trọn An Lòng' },
  brandStory: {
    title: { type: String, default: 'Câu Chuyện Thương Hiệu An Đông' },
    meaning: { type: String, default: '“Đông” đại diện cho sự bền bỉ để đi qua những mùa khó khăn, còn “An” là sự bình an muốn dành cho người mình thương.' },
    content: { type: String, default: '' },
    // Đã bỏ chữ "Organic" khỏi khái niệm thương hiệu: không được dùng khi chưa
    // có chứng nhận hữu cơ (Nghị định 109/2018/NĐ-CP, TCVN 11041). Đồng bộ với
    // giá trị seed thật trong data/seedData.js.
    concept: { type: String, default: 'Bình An Ở Phía Đông (An tâm – An lành – An vui)' }
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
