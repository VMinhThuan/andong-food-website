import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08
    }
  }
};

export default function AboutPage() {
  const steps = [
    {
      step: '01',
      title: 'CHỌN GIỐNG',
      desc: 'Tuyển chọn nguồn giống thuần chủng, chất lượng tốt.'
    },
    {
      step: '02',
      title: 'CANH TÁC',
      desc: 'Chăm sóc theo quy trình tự nhiên, an toàn sinh thái.'
    },
    {
      step: '03',
      title: 'THU HOẠCH',
      desc: 'Thu hoạch đúng độ chín vàng óng của hạt lúa.'
    },
    {
      step: '04',
      title: 'SẢN XUẤT',
      desc: 'Xay xát và làm sạch với quy trình khép kín.'
    },
    {
      step: '05',
      title: 'ĐÓNG GÓI',
      desc: 'Bảo quản cẩn thận và dán mã QR minh bạch thông tin.'
    }
  ];

  return (
    <div className="about-page" style={{ backgroundColor: '#faf8f2', color: '#1b4332' }}>
      
      {/* 1. ABOUT HERO (SPLIT CINEMATIC 43/57 LAYOUT) */}
      <section style={{
        background: 'linear-gradient(135deg, #081c15 0%, #0d281e 50%, #16382a 100%)',
        color: '#ffffff',
        padding: '75px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow behind image */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 196, 106, 0.14) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '55px',
            alignItems: 'center'
          }}>
            {/* Left Content (43%) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
                VỀ AN ĐÔNG FOOD
              </div>

              {/* Heading cân đối đúng 2 dòng, sang trọng */}
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)',
                color: '#fefae0',
                lineHeight: 1.22,
                marginBottom: '18px',
                fontWeight: '800',
                letterSpacing: '0.5px'
              }}>
                Chăm Lo Cho Người Mình Thương <br />
                Qua Từng Bữa Cơm
              </h1>

              {/* Copywriting đắt giá, kết nối trực tiếp thương hiệu */}
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: '#d1e3d9',
                marginBottom: '28px',
                maxWidth: '490px'
              }}>
                Đôi khi, sự quan tâm dành cho gia đình chỉ đơn giản là chọn một nguồn thực phẩm chất lượng, thơm ngon. An Đông giúp bạn gửi gắm điều đó qua từng bữa cơm.
              </p>

              {/* 1 CTA chính duy nhất */}
              <div>
                <Link
                  to="/san-pham"
                  className="btn btn-gold btn-lg"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '15px 34px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <span>Khám Phá Sản Phẩm</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual Image (57% - Lớn & Sắc nét hơn) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInRight}
            >
              <div style={{
                borderRadius: '26px',
                overflow: 'hidden',
                boxShadow: '0 24px 50px rgba(0, 0, 0, 0.38)',
                border: '3px solid rgba(255, 255, 255, 0.15)'
              }}>
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src="/assets/rice-grains.jpg"
                  alt="Bông lúa vàng tinh hoa An Đông Food"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = '/assets/rice-sunrise.jpg'; }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CÂU CHUYỆN TÊN GỌI (EDITORIAL 50/50 - REFINED PROPORTIONS) */}
      <section style={{
        padding: '65px 0 75px',
        backgroundColor: '#faf8f2',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            {/* Left: Meaning & Typography Keywords */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
              </motion.div>

              <motion.h2 variants={fadeInUp} style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.85rem, 2.7vw, 2.35rem)',
                color: '#1b4332',
                lineHeight: 1.28,
                marginBottom: '20px',
                fontWeight: '800'
              }}>
                “Đông” là Sự Bền Bỉ – <br />
                “An” là Sự Bình An
              </motion.h2>

              <motion.p variants={fadeInUp} style={{
                fontSize: '1.02rem',
                lineHeight: '1.8',
                color: '#2d4a3e',
                marginBottom: '14px',
                maxWidth: '540px'
              }}>
                <strong>“Đông”</strong> đại diện cho tinh thần bền bỉ, kiên định qua những mùa vụ và thử thách của đất trời.
              </motion.p>

              <motion.p variants={fadeInUp} style={{
                fontSize: '1.02rem',
                lineHeight: '1.8',
                color: '#2d4a3e',
                marginBottom: '30px',
                maxWidth: '540px'
              }}>
                <strong>“An”</strong> là lời chúc bình an, an lòng được gửi gắm trong từng bữa cơm gia đình.
              </motion.p>

              {/* 2 Typography Keywords (Bỏ card, typography thuần khiết) */}
              <motion.div variants={fadeInUp} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
                maxWidth: '480px'
              }}>
                <div style={{
                  paddingBottom: '14px',
                  borderBottom: '2px solid #b07d35'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#1b4332',
                    marginBottom: '4px',
                    letterSpacing: '1px'
                  }}>
                    ĐÔNG
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#627c70', fontWeight: '600' }}>
                    Bền bỉ • Kiên định
                  </div>
                </div>

                <div style={{
                  paddingBottom: '14px',
                  borderBottom: '2px solid #2d6a4f'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#1b4332',
                    marginBottom: '4px',
                    letterSpacing: '1px'
                  }}>
                    AN
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#627c70', fontWeight: '600' }}>
                    Bình an • An lòng
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Authentic Farmer & Field Photo (48-50% with subtle caption) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
            >
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(27, 67, 50, 0.12)',
                border: '3px solid #ffffff',
                position: 'relative'
              }}>
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  src="/assets/rice-mekong.jpg"
                  alt="Nông nghiệp An Đông Food"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = '/assets/rice-sunrise.jpg'; }}
                />

                {/* Subtle Luxury Caption */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(8, 28, 21, 0.78)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  color: '#fefae0',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase'
                }}>
                  Vùng Đất • Mùa Vụ • Con Người
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TẦM NHÌN & SỨ MỆNH (EDITORIAL TYPOGRAPHY - NỀN GIẤY #F5F1E8 - BỎ CARD) */}
      <section style={{
        padding: '95px 0',
        backgroundColor: '#f5f1e8',
        borderTop: '1px solid #e7e0d2',
        borderBottom: '1px solid #e7e0d2'
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ marginBottom: '50px' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
              color: '#1b4332',
              fontWeight: '800',
              margin: 0
            }}>
              Định Hướng & Trách Nhiệm Của An Đông
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px'
          }}>
            {/* 01 TẦM NHÌN */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
              style={{
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(176, 125, 53, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: '#b07d35',
                  letterSpacing: '0.5px'
                }}>
                  01
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: '#1b4332',
                  margin: 0,
                  fontWeight: '800',
                  letterSpacing: '1px'
                }}>
                  TẦM NHÌN
                </h3>
              </div>
              <p style={{
                fontSize: '1.04rem',
                lineHeight: '1.8',
                color: '#526058',
                margin: 0,
                paddingLeft: '44px'
              }}>
                Trở thành thương hiệu gạo Việt được tin chọn trong mỗi gia đình, góp phần vun đắp những bữa cơm ngon, an lành và gắn kết qua nhiều thế hệ.
              </p>
            </motion.div>

            {/* 02 SỨ MỆNH */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
              style={{
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(176, 125, 53, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: '#b07d35',
                  letterSpacing: '0.5px'
                }}>
                  02
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: '#1b4332',
                  margin: 0,
                  fontWeight: '800',
                  letterSpacing: '1px'
                }}>
                  SỨ MỆNH
                </h3>
              </div>
              <p style={{
                fontSize: '1.04rem',
                lineHeight: '1.8',
                color: '#526058',
                margin: 0,
                paddingLeft: '44px'
              }}>
                Giúp mỗi người chăm lo cho người mình thương bằng những hạt gạo ngon, chất lượng đáng tin và những bữa cơm an lành mỗi ngày.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. ĐỊNH VỊ THƯƠNG HIỆU */}
      <section style={{ padding: '95px 0', backgroundColor: '#faf8f2' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ maxWidth: '640px', marginBottom: '50px' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
              color: '#1b4332',
              lineHeight: 1.25,
              fontWeight: '800',
              marginBottom: '14px'
            }}>
              Những Giá Trị An Đông Theo Đuổi
            </h2>
            <p style={{ color: '#68776f', fontSize: '1.04rem', margin: 0, lineHeight: 1.7 }}>
              An Đông bền bỉ mang đến những hạt gạo thơm ngon, chất lượng đáng tin,
              để người ăn ngon miệng và người chọn an lòng.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '30px'
            }}
          >
            {[
              { title: 'Chân Thật', desc: 'Trung thực trong nguồn nguyên liệu và thông tin gửi đến người tiêu dùng.' },
              { title: 'Trách Nhiệm', desc: 'Đặt sức khỏe người dùng và sự bền vững của nhà nông làm trọng tâm.' },
              { title: 'Chu Đáo', desc: 'Chăm chút từ khâu chọn giống, đóng gói đến hướng dẫn sử dụng.' },
              { title: 'Bền Bỉ', desc: 'Kiên định với chuẩn mực chất lượng, đồng hành cùng bữa cơm Việt qua năm tháng.' }
            ].map((val) => (
              <motion.div
                key={val.title}
                variants={fadeInUp}
                style={{ borderTop: '2px solid rgba(176, 125, 53, 0.35)', paddingTop: '20px' }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.3rem',
                  color: '#1b4332',
                  fontWeight: '800',
                  margin: '0 0 10px'
                }}>
                  {val.title}
                </h3>
                <p style={{ color: '#526058', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. QUY TRÌNH: TỪ CÁNH ĐỒNG ĐẾN BỮA CƠM (DARK GREEN TIMELINE CHUẨN MỰC) */}
      <section style={{
        padding: '100px 0 105px',
        background: 'linear-gradient(135deg, #081c15 0%, #0d281e 50%, #1b4332 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Rice Field Texture Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/rice-sunrise.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 55px' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
              color: '#fefae0',
              lineHeight: 1.25,
              fontWeight: '800',
              marginBottom: '12px'
            }}>
              Từ Cánh Đồng Đến Bữa Cơm
            </h2>
            <p style={{ color: '#d1e3d9', fontSize: '1.05rem', margin: 0 }}>
              Hành trình gìn giữ trọn vẹn giá trị hạt gạo qua từng công đoạn chuẩn mực.
            </p>
          </motion.div>

          {/* 5-Step Horizontal Linked Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              position: 'relative'
            }}
          >
            {steps.map((s) => (
              <motion.div
                key={s.step}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                style={{
                  backgroundColor: 'rgba(18, 40, 32, 0.75)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '28px 20px',
                  border: '1px solid rgba(233, 196, 106, 0.25)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                {/* Step Number Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#e9c46a',
                    letterSpacing: '1px'
                  }}>
                    {s.step}
                  </span>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#e9c46a',
                    boxShadow: '0 0 10px #e9c46a'
                  }} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: '#ffffff',
                  fontWeight: '700',
                  marginBottom: '10px',
                  letterSpacing: '0.5px'
                }}>
                  {s.title}
                </h3>

                <p style={{
                  color: '#cadbd1',
                  fontSize: '0.88rem',
                  lineHeight: '1.65',
                  margin: 0
                }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
