import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ArrowRight, ExternalLink, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import CustomSelect from '../components/common/CustomSelect';
import { triggerHotlineModal } from '../components/common/HotlineModal';
import SEO from '../components/common/SEO';

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

  const [lastSubmitted, setLastSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isBusinessSubject = formData.subject.includes('Đại lý') || formData.subject.includes('Nhà hàng') || formData.subject.includes('phân phối');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.sendContact(formData);
      setLastSubmitted({
        ...formData,
        id: res?.data?.id || 'N/A',
        submittedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      });
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
      <SEO
        title="Liên Hệ & Tư Vấn Đại Lý"
        description="Liên hệ với An Đông Food để nhận tư vấn phân phối, chính sách đại lý và đặt hàng các dòng gạo sạch chuẩn giống: ST25, Vuông Tôm."
        keywords="Liên hệ An Đông Food, Đại lý gạo An Đông, Mua gạo sỉ, Phân phối gạo sạch"
      />

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
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: '640px', margin: '0 auto' }}
          >
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
          </m.div>
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
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInLeft}
            >
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
                  backgroundColor: 'var(--bg-card)',
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

                  <button
                    type="button"
                    onClick={triggerHotlineModal}
                    className="btn-brand-cta"
                    style={{ fontSize: '0.82rem', padding: '8px 18px' }}
                  >
                    <span>Gọi Ngay</span>
                  </button>
                </div>

                {/* Item 2: Email */}
                <div style={{
                  padding: '20px 22px',
                  backgroundColor: 'var(--bg-card)',
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
                      href="mailto:andofoodvn@gmail.com"
                      style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none', display: 'block', marginTop: '2px' }}
                    >
                      andofoodvn@gmail.com
                    </a>
                  </div>
                </div>

                {/* Item 3: Working Hours */}
                <div style={{
                  padding: '20px 22px',
                  backgroundColor: 'var(--bg-card)',
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
                  backgroundColor: 'var(--bg-card)',
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
            </m.div>

            {/* CỘT PHẢI (62%): GỬI YÊU CẦU TRỰC TUYẾN */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInRight}
            >
              <div style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '26px',
                padding: '42px clamp(24px, 4vw, 48px)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 12px 35px rgba(17, 156, 74, 0.06)'
              }}>
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
                  <m.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      padding: '36px 28px',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: '22px',
                      border: '1px solid var(--border-color)',
                      color: 'var(--primary)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(17, 156, 74, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px'
                    }}>
                      <CheckCircle2 size={40} color="var(--primary)" />
                    </div>

                    <h4 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.4rem, 2vw, 1.65rem)',
                      fontWeight: '800',
                      color: 'var(--primary)',
                      marginBottom: '8px'
                    }}>
                      An Đông Đã Nhận Được Yêu Cầu!
                    </h4>

                    <p style={{
                      fontSize: '0.94rem',
                      color: '#526058',
                      lineHeight: 1.65,
                      maxWidth: '460px',
                      margin: '0 auto 20px'
                    }}>
                      Thông tin yêu cầu của bạn đã được chuyển đến bộ phận hỗ trợ khách hàng An Đông Food. Thư xác nhận cũng đã được gửi tới email của bạn. Chuyên viên An Đông sẽ liên hệ tư vấn lại cho bạn trong thời gian sớm nhất.
                    </p>

                    {/* Snapshot info box */}
                    {lastSubmitted && (
                      <div style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        textAlign: 'left',
                        marginBottom: '26px',
                        fontSize: '0.88rem',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                          <span style={{ color: '#859b8f', fontWeight: '600' }}>Khách hàng:</span>
                          <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{lastSubmitted.fullName}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                          <span style={{ color: '#859b8f', fontWeight: '600' }}>Số điện thoại:</span>
                          <span style={{ fontWeight: '700', color: 'var(--brand-green-dark)' }}>{lastSubmitted.phone}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                          <span style={{ color: '#859b8f', fontWeight: '600' }}>Chủ đề:</span>
                          <span style={{ fontWeight: '700' }}>{lastSubmitted.subject}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#859b8f', fontWeight: '600' }}>Thời gian gửi:</span>
                          <span style={{ fontWeight: '600', color: 'var(--brand-brown)' }}>{lastSubmitted.submittedAt}</span>
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="btn-brand-cta"
                        style={{ fontSize: '0.92rem', padding: '10px 24px' }}
                      >
                        <span>Gửi Yêu Cầu Khác</span>
                      </button>
                      <Link
                        to="/"
                        className="btn-brand-cta"
                        style={{ fontSize: '0.92rem', padding: '10px 24px' }}
                      >
                        <span>Trở Về Trang Chủ</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </m.div>
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
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="Ví dụ: 090 123 4567"
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
                          Email *
                        </label>
                        <input
                          type="email"
                          required
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
                      <m.div
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
                      </m.div>
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
                      className="btn-brand-cta"
                      style={{
                        width: '100%',
                        padding: '14px 28px',
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
            </m.div>
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
                className="btn-brand-cta"
                style={{ fontSize: '0.88rem', padding: '10px 20px' }}
              >
                <Phone size={15} />
                <span>Điện thoại: 0944 852 464</span>
              </a>

              <a
                href="https://zalo.me/0944852464"
                target="_blank"
                rel="noreferrer"
                className="btn-brand-cta"
                style={{ fontSize: '0.88rem', padding: '10px 20px' }}
              >
                <span>Zalo Official</span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61594052996339"
                target="_blank"
                rel="noreferrer"
                className="btn-brand-cta"
                style={{ fontSize: '0.88rem', padding: '10px 20px' }}
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
