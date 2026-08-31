import nodemailer from 'nodemailer';

/**
 * Service quản lý gửi Email qua giao thức SMTP (Gmail) cho An Đông Food
 * Thiết kế tối giản, hiện đại, chuẩn Responsive 100% trên Mobile / Tablet / Desktop, KHÔNG ICON
 */
class EmailService {
  constructor() {
    this.transporter = null;
  }

  /**
   * Khởi tạo hoặc lấy transporter nodemailer
   */
  getTransporter() {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;
    const user = process.env.SMTP_USER || 'Andofoodvn@gmail.com';
    const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

    if (!pass) {
      console.warn('⚠️ [EmailService] SMTP_PASS chưa được cấu hình trong .env');
      return null;
    }

    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        pool: true, // Duy trì kết nối socket sẵn sàng gửi ngay lập tức mà không phải bắt tay TLS lại từ đầu
        maxConnections: 3,
        maxMessages: 50,
        host,
        port,
        secure,
        auth: {
          user,
          pass
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }

    return this.transporter;
  }

  /**
   * Định dạng thời gian theo múi giờ Việt Nam
   */
  formatDateTime(dateInput) {
    const d = dateInput ? new Date(dateInput) : new Date();
    return d.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  /**
   * 1. HTML Email gửi về EMAIL CÔNG TY
   * - Bỏ nút Admin
   * - Nút bấm tách rời qua bảng Table (Bulletproof Email Table Stack)
   * - Responsive 100% trên Mobile/Tablet
   */
  generateCompanyInquiryHtml(contact) {
    const formattedTime = this.formatDateTime(contact.createdAt);
    const clientUrl = process.env.CLIENT_URL || 'https://www.andofood.vn';
    const companyEmail = process.env.COMPANY_RECEIVE_EMAIL || process.env.SMTP_USER || 'Andofoodvn@gmail.com';

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Yêu Cầu Tư Vấn Mới - An Đông Food</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
      .content-cell { padding: 20px 16px !important; }
      .header-cell { padding: 24px 16px 18px !important; }
      .table-label { width: 38% !important; font-size: 12.5px !important; padding: 9px 10px !important; }
      .table-value { font-size: 13px !important; padding: 9px 10px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8; width:100%;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        
        <!-- Main Card Container -->
        <table role="presentation" class="email-container" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 4px 16px rgba(0,0,0,0.03); margin:0 auto;">
          
          <!-- Top Brand Accent Line -->
          <tr>
            <td height="4" style="background-color:#119C4A; line-height:4px; font-size:4px;">&nbsp;</td>
          </tr>

          <!-- Header (Vertical Stack - Không đè chữ) -->
          <tr>
            <td class="header-cell" style="padding:28px 28px 20px; border-bottom:1px solid #f1f5f9; text-align:left;">
              <div style="margin-bottom:8px;">
                <span style="display:inline-block; font-size:11px; font-weight:700; color:#119C4A; background-color:#f0fdf4; border:1px solid #bbf7d0; padding:4px 10px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">THÔNG BÁO YÊU CẦU MỚI</span>
              </div>
              <div style="font-size:22px; font-weight:800; color:#119C4A; letter-spacing:0.5px; text-transform:uppercase; line-height:1.2;">AN ĐÔNG FOOD</div>
              <div style="font-size:13px; color:#64748b; margin-top:4px; line-height:1.4;">Hệ thống Tiếp nhận Yêu cầu & Tư vấn Khách hàng Website</div>
            </td>
          </tr>

          <!-- Notice Box -->
          <tr>
            <td class="content-cell" style="padding:20px 28px 0;">
              <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-left:4px solid #119C4A; border-radius:6px; padding:13px 15px; font-size:13.5px; color:#334155; line-height:1.5;">
                Khách hàng vừa gửi biểu mẫu liên hệ trực tuyến trên website. Vui lòng xem thông tin chi tiết và phản hồi khách hàng sớm nhất.
              </div>
            </td>
          </tr>

          <!-- Customer Information Table -->
          <tr>
            <td class="content-cell" style="padding:20px 28px 0;">
              <div style="font-size:12.5px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:10px;">THÔNG TIN KHÁCH HÀNG</div>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; width:100%;">
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" width="35%" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Họ và Tên</td>
                  <td class="table-value" style="padding:10px 14px; font-size:14px; font-weight:700; color:#0f172a;">${contact.fullName || 'Khách hàng'}</td>
                </tr>
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Số Điện Thoại</td>
                  <td class="table-value" style="padding:10px 14px; font-size:14px; font-weight:700; color:#119C4A;">
                    <a href="tel:${contact.phone}" style="color:#119C4A; text-decoration:none;">${contact.phone}</a>
                  </td>
                </tr>
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Địa Chỉ Email</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13.5px; font-weight:600; color:#0f172a;">
                    <a href="mailto:${contact.email}" style="color:#2563eb; text-decoration:none; word-break:break-all;">${contact.email}</a>
                  </td>
                </tr>
                ${contact.company ? `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Công Ty / Đơn Vị</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13.5px; font-weight:600; color:#0f172a;">${contact.company}</td>
                </tr>` : ''}
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Chủ Đề Yêu Cầu</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13.5px; font-weight:700; color:#754C1F;">${contact.subject || 'Tư vấn sản phẩm Gạo An Đông'}</td>
                </tr>
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Thời Gian Gửi</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13px; color:#475569;">${formattedTime}</td>
                </tr>
                <tr>
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Mã Tiếp Nhận</td>
                  <td class="table-value" style="padding:10px 14px; font-size:12.5px; font-family:Consolas, monospace; color:#64748b;">${contact.id || 'N/A'}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Content Section -->
          <tr>
            <td class="content-cell" style="padding:20px 28px 0;">
              <div style="font-size:12.5px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:10px;">NỘI DUNG YÊU CẦU CHI TIẾT</div>
              <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px 18px; font-size:13.5px; line-height:1.65; color:#1e293b; white-space:pre-wrap; word-break:break-word;">${contact.message || '(Không có nội dung tin nhắn)'}</div>
            </td>
          </tr>

          <!-- Action Buttons (Bulletproof Table Stack - 2 nút riêng biệt, cách xa nhau rõ ràng) -->
          <tr>
            <td class="content-cell" style="padding:24px 28px 12px; text-align:center;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:380px; margin:0 auto;">
                <!-- Nút 1: Gọi điện thoại -->
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" bgcolor="#119C4A" style="border-radius:8px;">
                          <a href="tel:${contact.phone}" style="display:block; width:100%; padding:13px 20px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; box-sizing:border-box; border-radius:8px; text-align:center;">Gọi Điện Cho Khách: ${contact.phone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Nút 2: Soạn email -->
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" bgcolor="#0f172a" style="border-radius:8px;">
                          <a href="mailto:${contact.email}?subject=Phản%20hồi%20yêu%20cầu%20từ%20An%20Đông%20Food&body=Kính%20chào%20${encodeURIComponent(contact.fullName || 'Quý khách')}," style="display:block; width:100%; padding:13px 20px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; box-sizing:border-box; border-radius:8px; text-align:center;">Soạn Email Phản Hồi Cho Khách</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="content-cell" style="background-color:#f8fafc; border-top:1px solid #f1f5f9; padding:20px 24px; text-align:center; font-size:12px; color:#64748b; line-height:1.6;">
              <strong style="color:#119C4A;">CÔNG TY TNHH THỰC PHẨM AN ĐÔNG</strong><br>
              Trụ sở: Ấp Long Thành, xã Phước Long, tỉnh Cà Mau<br>
              Hotline: 0944 852 464 &nbsp;|&nbsp; Email: ${companyEmail} &nbsp;|&nbsp; Website: <a href="${clientUrl}" style="color:#119C4A; text-decoration:none;">${clientUrl}</a><br>
              <span style="font-size:11px; color:#94a3b8; display:inline-block; margin-top:6px;">Email thông báo tự động từ Hệ thống Website An Đông Food.</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
  }

  /**
   * 2. HTML Email gửi CẢM ƠN & XÁC NHẬN cho Khách Hàng
   * - Nút bấm tách rời qua bảng Table (Bulletproof Email Table Stack)
   * - Responsive 100% trên Mobile/Tablet
   */
  generateCustomerConfirmationHtml(contact) {
    const clientUrl = process.env.CLIENT_URL || 'https://www.andofood.vn';
    const formattedTime = this.formatDateTime(contact.createdAt);
    const companyEmail = process.env.COMPANY_RECEIVE_EMAIL || process.env.SMTP_USER || 'Andofoodvn@gmail.com';

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>An Đông Food - Xác Nhận Tiếp Nhận Yêu Cầu</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
      .content-cell { padding: 20px 16px !important; }
      .header-cell { padding: 24px 16px 18px !important; }
      .table-label { width: 38% !important; font-size: 12.5px !important; padding: 9px 10px !important; }
      .table-value { font-size: 13px !important; padding: 9px 10px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8; width:100%;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        
        <!-- Main Card Container -->
        <table role="presentation" class="email-container" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 4px 16px rgba(0,0,0,0.03); margin:0 auto;">
          
          <!-- Top Brand Accent Line -->
          <tr>
            <td height="4" style="background-color:#119C4A; line-height:4px; font-size:4px;">&nbsp;</td>
          </tr>

          <!-- Header (Vertical Stack - Không bao giờ đè chữ) -->
          <tr>
            <td class="header-cell" style="padding:28px 28px 20px; border-bottom:1px solid #f1f5f9; text-align:left;">
              <div style="margin-bottom:8px;">
                <span style="display:inline-block; font-size:11px; font-weight:700; color:#119C4A; background-color:#f0fdf4; border:1px solid #bbf7d0; padding:4px 10px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">XÁC NHẬN TIẾP NHẬN YÊU CẦU</span>
              </div>
              <div style="font-size:22px; font-weight:800; color:#119C4A; letter-spacing:0.5px; text-transform:uppercase; line-height:1.2;">AN ĐÔNG FOOD</div>
              <div style="font-size:13px; color:#64748b; margin-top:4px; line-height:1.4;">Gạo An Đông - Chất lượng từ tâm • Cà Mau</div>
            </td>
          </tr>

          <!-- Greeting & Main Message -->
          <tr>
            <td class="content-cell" style="padding:24px 28px 0;">
              <div style="font-size:16px; font-weight:700; color:#0f172a; margin-bottom:10px;">
                Kính gửi Quý khách ${contact.fullName || ''},
              </div>
              <div style="font-size:14px; line-height:1.7; color:#334155;">
                An Đông Food xin chân thành cảm ơn Quý khách đã quan tâm và gửi yêu cầu thông qua website của chúng tôi. Yêu cầu của Quý khách đã được hệ thống ghi nhận thành công và chuyển trực tiếp đến bộ phận chăm sóc khách hàng.
              </div>
            </td>
          </tr>

          <!-- Summary Table -->
          <tr>
            <td class="content-cell" style="padding:20px 28px 0;">
              <div style="font-size:12.5px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:10px;">THÔNG TIN YÊU CẦU ĐÃ TIẾP NHẬN</div>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; width:100%;">
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" width="35%" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Họ và Tên</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13.5px; font-weight:700; color:#0f172a;">${contact.fullName || 'Quý khách'}</td>
                </tr>
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Số Điện Thoại</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13.5px; font-weight:700; color:#119C4A;">${contact.phone}</td>
                </tr>
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Chủ Đề</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13.5px; font-weight:600; color:#0f172a;">${contact.subject || 'Tư vấn sản phẩm Gạo An Đông'}</td>
                </tr>
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Thời Gian Tiếp Nhận</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13px; color:#475569;">${formattedTime}</td>
                </tr>
                <tr>
                  <td class="table-label" style="padding:10px 14px; font-size:13px; font-weight:600; color:#64748b; background-color:#f8fafc;">Nội Dung Gửi</td>
                  <td class="table-value" style="padding:10px 14px; font-size:13.5px; color:#334155; line-height:1.5;">"${contact.message || ''}"</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps & Response Commitment -->
          <tr>
            <td class="content-cell" style="padding:20px 28px 0;">
              <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:15px 16px; font-size:13.5px; line-height:1.65; color:#334155;">
                <div style="font-weight:700; color:#0f172a; margin-bottom:4px;">Thời gian phản hồi dự kiến:</div>
                Chuyên viên tư vấn của An Đông Food sẽ chủ động liên hệ lại với Quý khách qua số điện thoại <strong>${contact.phone}</strong> hoặc email này trong thời gian sớm nhất trong giờ làm việc (08:00 – 18:00 từ Thứ 2 đến Thứ 7).
              </div>
            </td>
          </tr>

          <!-- Direct Hotline & CTA Buttons (Bulletproof Table Stack - 2 nút tách rời, cách xa nhau) -->
          <tr>
            <td class="content-cell" style="padding:20px 28px 24px; text-align:center;">
              <div style="font-size:13px; color:#64748b; margin-bottom:14px;">Nếu Quý khách cần hỗ trợ khẩn cấp hoặc đặt hàng số lượng lớn:</div>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:380px; margin:0 auto;">
                <!-- Nút 1: Hotline -->
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" bgcolor="#119C4A" style="border-radius:8px;">
                          <a href="tel:0944852464" style="display:block; width:100%; padding:13px 20px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; box-sizing:border-box; border-radius:8px; text-align:center;">Gọi Hotline Hỗ Trợ: 0944 852 464</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Nút 2: Xem sản phẩm -->
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" bgcolor="#ffffff" style="border-radius:8px; border:1px solid #119C4A;">
                          <a href="${clientUrl}" style="display:block; width:100%; padding:12px 20px; color:#119C4A; font-size:13.5px; font-weight:700; text-decoration:none; box-sizing:border-box; border-radius:8px; text-align:center;">Xem Thêm Sản Phẩm Tại Website</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="content-cell" style="background-color:#f8fafc; border-top:1px solid #f1f5f9; padding:20px 24px; text-align:center; font-size:12px; color:#64748b; line-height:1.6;">
              <strong style="color:#119C4A;">CÔNG TY TNHH THỰC PHẨM AN ĐÔNG</strong><br>
              Trụ sở: Ấp Long Thành, xã Phước Long, tỉnh Cà Mau<br>
              Hotline: 0944 852 464 &nbsp;|&nbsp; Email: ${companyEmail} &nbsp;|&nbsp; Website: <a href="${clientUrl}" style="color:#119C4A; text-decoration:none;">${clientUrl}</a><br>
              <span style="font-size:11px; color:#94a3b8; display:inline-block; margin-top:6px;">Email này được gửi tự động để xác nhận yêu cầu của Quý khách tại An Đông Food.</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
  }

  /**
   * Gửi email thông báo về email công ty
   */
  async sendInquiryNotificationToCompany(contactData) {
    try {
      const transporter = this.getTransporter();
      if (!transporter) {
        console.warn('⚠️ [EmailService] SMTP_PASS chưa được cấu hình. Bỏ qua gửi email qua SMTP.');
        return { success: false, reason: 'SMTP credentials not configured' };
      }

      const senderEmail = process.env.SMTP_USER || 'Andofoodvn@gmail.com';
      const companyReceiveEmail = process.env.COMPANY_RECEIVE_EMAIL || senderEmail;
      const subject = `[Yêu cầu mới] [${contactData.subject || 'Tư vấn'}] từ ${contactData.fullName || 'Khách hàng'} - An Đông Food`;

      const mailOptions = {
        from: `"An Đông Food Website" <${senderEmail}>`,
        to: companyReceiveEmail,
        replyTo: contactData.email || senderEmail,
        subject,
        html: this.generateCompanyInquiryHtml(contactData)
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ [EmailService] Đã gửi email thông báo tới công ty (${companyReceiveEmail}):`, info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ [EmailService] Lỗi khi gửi email thông báo công ty:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Gửi email cảm ơn và xác nhận cho khách hàng
   */
  async sendCustomerConfirmationEmail(contactData) {
    if (!contactData || !contactData.email || !contactData.email.includes('@')) {
      console.warn('⚠️ [EmailService] Email khách hàng không hợp lệ:', contactData?.email);
      return { success: false, reason: 'No valid customer email' };
    }

    try {
      const transporter = this.getTransporter();
      if (!transporter) {
        console.warn('⚠️ [EmailService] SMTP_PASS chưa được cấu hình.');
        return { success: false, reason: 'SMTP credentials not configured' };
      }

      const senderEmail = process.env.SMTP_USER || 'Andofoodvn@gmail.com';
      const subject = `[An Đông Food] Tiếp nhận yêu cầu: ${contactData.subject || 'Tư vấn sản phẩm Gạo An Đông'}`;

      const mailOptions = {
        from: `"An Đông Food" <${senderEmail}>`,
        to: contactData.email.trim(),
        subject,
        html: this.generateCustomerConfirmationHtml(contactData)
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ [EmailService] Đã gửi email xác nhận cho khách hàng (${contactData.email}):`, info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ [EmailService] Lỗi khi gửi email xác nhận cho khách:', error.message);
      return { success: false, error: error.message };
    }
  }
}

export const emailService = new EmailService();
export default emailService;
