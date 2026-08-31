import { contactModel } from '../models/contactModel.js';
import { emailService } from '../services/emailService.js';

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
      if (!fullName || !phone || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ Họ tên, Số điện thoại, Email và Nội dung liên hệ.'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: 'Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.'
        });
      }

      const newContact = await contactModel.create({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        subject: subject || 'Tư vấn sản phẩm An Đông',
        message: message.trim(),
        company: company ? company.trim() : ''
      });

      const plainContact = newContact && typeof newContact.toObject === 'function' ? newContact.toObject() : newContact;

      // Gửi tuần tự 2 email qua SMTP: 1 thông báo công ty + 1 xác nhận khách hàng (tránh nghẽn socket SMTP Gmail)
      (async () => {
        try {
          await emailService.sendInquiryNotificationToCompany(plainContact);
        } catch (err) {
          console.error('⚠️ [contactController] Lỗi gửi email công ty:', err);
        }

        try {
          await emailService.sendCustomerConfirmationEmail(plainContact);
        } catch (err) {
          console.error('⚠️ [contactController] Lỗi gửi email khách hàng:', err);
        }
      })();

      res.status(201).json({
        success: true,
        message: 'Cảm ơn quý khách! Thông tin liên hệ đã được gửi thành công. An Đông sẽ phản hồi sớm nhất.',
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

