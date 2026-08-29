import { contactModel } from '../models/contactModel.js';

export const contactController = {
  async getAll(req, res, next) {
    try {
      const contacts = await contactModel.findAll(req.query);
      res.json({
        success: true,
        count: contacts.length,
        data: contacts
      });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { fullName, phone, email, subject, message, company } = req.body;
      if (!fullName || !phone || !message) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền Họ tên, Số điện thoại và Nội dung liên hệ.'
        });
      }

      const newContact = await contactModel.create({
        fullName,
        phone,
        email: email || '',
        subject: subject || 'Tư vấn sản phẩm An Đông Food',
        message,
        company: company || ''
      });

      res.status(201).json({
        success: true,
        message: 'Cảm ơn quý khách! Thông tin liên hệ đã được gửi thành công. An Đông Food sẽ phản hồi sớm nhất.',
        data: newContact
      });
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, assignedTo } = req.body;
      const updated = await contactModel.updateStatus(id, status, assignedTo || req.user?.username);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy liên hệ.' });
      }
      res.json({
        success: true,
        message: 'Đã cập nhật trạng thái liên hệ!',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await contactModel.delete(req.params.id);
      res.json({ success: true, message: 'Đã xóa tin nhắn liên hệ.' });
    } catch (err) {
      next(err);
    }
  }
};
