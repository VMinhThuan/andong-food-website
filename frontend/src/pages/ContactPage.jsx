import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ArrowRight, ExternalLink, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import CustomSelect from '../components/common/CustomSelect';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    subject: 'Tư vấn sản phẩm Gạo An Đông',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isBusinessSubject = formData.subject.includes('Đại lý') || formData.subject.includes('Nhà hàng') || formData.subject.includes('phân phối');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.sendContact(formData);
      setSubmitted(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        company: '',
        subject: 'Tư vấn sản phẩm Gạo An Đông',
        message: ''
      });
    } catch (err) {
      setError(err.message || 'Không thể gửi tin nhắn. Vui lòng kiểm tra lại kết nối.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--primary)' }}>

      {/* 1. CONTACT HERO (COMPACT & ELEGANT) */}
      <section style={{
        background: 'linear-gradient(135deg, var(--bg-dark) 0%, rgba(10, 51, 26, 0.95) 50%, var(--primary) 100%)',
        color: '#ffffff',
        padding: '65px 0 75px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253, 185, 19, 0.12) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: '640px', margin: '0 auto' }}
          >
            <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
              KẾT NỐI VỚI AN ĐÔNG
            </div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)',
              color: 'var(--golden-pale)',
              lineHeight: 1.22,
              marginBottom: '14px',
              fontWeight: '800',
              letterSpacing: '0.5px'
            }}>
              Kết Nối Cùng An Đông
            </h1>
            <p style={{
              fontSize: '1.04rem',
              lineHeight: '1.75',
              color: '#d1e3d9',
              margin: 0
            }}>
              Dù bạn cần tư vấn sản phẩm, đặt hàng hay hợp tác phân phối, An Đông luôn sẵn sàng đồng hành và hỗ trợ tận tâm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION: 38% INFO / 62% MODERN FORM */}
      <section style={{ padding: '75px 0 85px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'start'
          }}>
            {/* CỘT TRÁI (38%): BẠN CẦN HỖ TRỢ? */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInLeft}
            >
              <div className="badge badge-green" style={{ marginBottom: '12px' }}>
                HỖ TRỢ TRỰC TIẾP
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 2.6vw, 2.3rem)',
                color: 'var(--primary)',
                fontWeight: '800',
                marginBottom: '12px'
              }}>
                Bạn Cần Hỗ Trợ?
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#526058', lineHeight: 1.7, marginBottom: '32px' }}>
                Đội ngũ chuyên viên An Đông luôn sẵn sàng giải đáp mọi thắc mắc về sản phẩm, quy trình và chính sách phân phối.
              </p>

              {/* Contact Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {/* Item 1: Hotline */}
                <div style={{
                  padding: '20px 22px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 18px rgba(17, 156, 74, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--golden-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Phone size={20} color="var(--earth-brown)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#859b8f', fontWeight: '700', textTransform: 'uppercase' }}>
                        Tư Vấn & Đặt Hàng
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary)', marginTop: '2px' }}>
                        0944 852 464
                      </div>
                    </div>
                  </div>

                  <a
                    href="tel:0944852464"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#ffffff',
                      padding: '7px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Gọi Ngay
                  </a>
                </div>

                {/* Item 2: Email */}
                <div style={{
                  padding: '20px 22px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 18px rgba(17, 156, 74, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#859b8f', fontWeight: '700', textTransform: 'uppercase' }}>
                      Email Hỗ Trợ
                    </div>
                    <a
                      href="mailto:andongfood@gmail.com"
                      style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none', display: 'block', marginTop: '2px' }}
                    >
                      andongfood@gmail.com
                    </a>
                  </div>
                </div>

                {/* Item 3: Working Hours */}
                <div style={{
                  padding: '20px 22px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 18px rgba(17, 156, 74, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--golden-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Clock size={20} color="var(--earth-brown)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#859b8f', fontWeight: '700', textTransform: 'uppercase' }}>
                      Thời Gian Hỗ Trợ
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--primary)', marginTop: '2px' }}>
                      08:00 – 18:00 (Thứ 2 – Thứ 7)
                    </div>
                  </div>
                </div>

                {/* Item 4: Address */}
                <div style={{
                  padding: '20px 22px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 18px rgba(17, 156, 74, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#859b8f', fontWeight: '700', textTransform: 'uppercase' }}>
                      Trụ Sở Chính
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#526058', lineHeight: 1.5, marginTop: '2px' }}>
                      Ấp Long Thành, xã Phước Long, tỉnh Cà Mau.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CỘT PHẢI (62%): GỬI YÊU CẦU TRỰC TUYẾN */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInRight}
            >
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '26px',
                padding: '42px clamp(24px, 4vw, 48px)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 12px 35px rgba(17, 156, 74, 0.06)'
              }}>
                <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
                  GỬI YÊU CẦU
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.7rem, 2.4vw, 2.1rem)',
                  color: 'var(--primary)',
                  fontWeight: '800',
                  marginBottom: '8px'
                }}>
                  Gửi Tin Nhắn Cho An Đông
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#526058', marginBottom: '28px', lineHeight: 1.6 }}>
                  Vui lòng điền thông tin bên dưới, chuyên viên tư vấn sẽ liên hệ phản hồi bạn trong thời gian sớm nhất.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      padding: '40px 24px',
                      textAlign: 'center',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: '20px',
                      border: '1px solid var(--border-color)',
                      color: 'var(--primary)'
                    }}
                  >
                    <CheckCircle2 size={54} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>
                      An Đông Đã Nhận Được Yêu Cầu!
                    </h4>
                    <p style={{ fontSize: '0.96rem', color: '#526058', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 24px' }}>
                      Cảm ơn bạn đã gửi thông tin. Đội ngũ nhân viên An Đông sẽ gọi điện tư vấn và hỗ trợ bạn trong thời gian sớm nhất.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn btn-outline"
                        style={{ padding: '10px 24px' }}
                      >
                        Gửi Yêu Cầu Khác
                      </button>
                      <Link to="/" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                        Trở Về Trang Chủ
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Row 1: Name & Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>
                          Họ và Tên *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          style={{
                            width: '100%',
                            height: '50px',
                            padding: '0 16px',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-main)',
                            fontSize: '0.92rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>
                          Số Điện Thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0944 852 464"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: '100%',
                            height: '50px',
                            padding: '0 16px',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-main)',
                            fontSize: '0.92rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Subject */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          style={{
                            width: '100%',
                            height: '50px',
                            padding: '0 16px',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-main)',
                            fontSize: '0.92rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>
                          Bạn Liên Hệ Về *
                        </label>
                        <CustomSelect
                          value={formData.subject}
                          onChange={val => setFormData({ ...formData, subject: val })}
                          options={[
                            { value: 'Tư vấn sản phẩm Gạo An Đông', label: 'Tư vấn sản phẩm gia đình' },
                            { value: 'Đặt hàng số lượng lớn', label: 'Đặt hàng số lượng lớn' },
                            { value: 'Đăng ký làm Đại lý / Nhà phân phối', label: 'Đại lý / Nhà phân phối' },
                            { value: 'Cung cấp gạo cho Nhà hàng / Khách sạn', label: 'Nhà hàng / Doanh nghiệp' },
                            { value: 'Khiếu nại & Hỗ trợ dịch vụ', label: 'Khiếu nại & Hỗ trợ dịch vụ' },
                            { value: 'Khác', label: 'Chủ đề khác' }
                          ]}
                        />
                      </div>
                    </div>

                    {/* Conditional Business Field */}
                    {isBusinessSubject && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>
                          Tên Công Ty / Khu Vực Kinh Doanh
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Công ty TNHH Thực phẩm / Khu vực TP.HCM..."
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                          style={{
                            width: '100%',
                            height: '50px',
                            padding: '0 16px',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-main)',
                            fontSize: '0.92rem',
                            outline: 'none'
                          }}
                        />
                      </motion.div>
                    )}

                    {/* Message Field */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>
                        Nội Dung Cần Hỗ Trợ *
                      </label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Vui lòng để lại nội dung yêu cầu cụ thể..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-main)',
                          fontSize: '0.92rem',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    {error && (
                      <div style={{ color: '#c62828', fontSize: '0.86rem' }}>
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-lg"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '16px',
                        marginTop: '6px'
                      }}
                    >
                      {loading ? 'Đang gửi...' : (
                        <>
                          <span>Gửi Yêu Cầu Cho An Đông</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. GHÉ THĂM AN ĐÔNG (GOOGLE MAP + TRỤ SỞ 50/50) */}
      <section style={{
        padding: '80px 0 90px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            {/* Left: Google Map Embed */}
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              height: '380px'
            }}>
              <iframe
                title="Bản đồ chỉ đường An Đông"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658423711!2d106.66698437583802!3d10.759917059496677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee30d4a974b%3A0xc3cf9c9a6a8b792e!2zQW4gxJDDtG5nLCBRdeG6rW4gNSwgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right: Visiting Details & Directions CTA */}
            <div>
              <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
                ĐỊA ĐIỂM TRỰC TIẾP
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 2.6vw, 2.3rem)',
                color: 'var(--primary)',
                fontWeight: '800',
                marginBottom: '14px'
              }}>
                Ghé Thăm An Đông
              </h2>
              <p style={{ fontSize: '1rem', color: '#526058', lineHeight: 1.7, marginBottom: '24px' }}>
                Quý đối tác và khách hàng có thể đến trực tiếp văn phòng để trải nghiệm các mẫu gạo mẫu và trao đổi chi tiết về hợp đồng hợp tác phân phối.
              </p>

              <div style={{
                backgroundColor: 'var(--bg-main)',
                borderRadius: '16px',
                padding: '20px 24px',
                marginBottom: '28px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div>
                  <strong style={{ color: 'var(--primary)' }}>📍 Địa chỉ: </strong>
                  <span style={{ color: '#526058' }}>Ấp Long Thành, xã Phước Long, tỉnh Cà Mau.</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--primary)' }}>🕒 Giờ mở cửa: </strong>
                  <span style={{ color: '#526058' }}>08:00 – 18:00 (Thứ 2 đến Thứ 7)</span>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px'
                }}
              >
                <span>Xem Chỉ Đường Trên Google Maps</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KẾT NỐI NHANH VỚI AN ĐÔNG */}
      <section style={{
        padding: '50px 0',
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--primary)' }}>
              Kết Nối Nhanh Cùng Chúng Tôi:
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="tel:0944852464"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.88rem'
                }}
              >
                <Phone size={15} color="var(--earth-brown)" />
                <span>Điện thoại: 0944 852 464</span>
              </a>

              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.88rem'
                }}
              >
                <span>Zalo Official</span>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.88rem'
                }}
              >
                <span>Facebook Page</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
