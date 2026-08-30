import React from 'react';

/**
 * Đồ họa bổ trợ chính thức của An Đông (Hồ sơ thương hiệu, mục 2.4):
 * "Yếu tố đồ họa được khai thác từ sự phân lớp của khung cảnh đồng lúa khi
 * hoàng hôn hoặc bình minh, được tạo ra bởi đường chân trời, bầu trời và
 * đồng lúa... dùng để làm khung chứa hình ảnh và có chức năng phân chia bố cục."
 *
 * Bản trước đây dùng đường cong Bezier mượt + 3 lớp chồng mờ (fillOpacity) —
 * đúng tinh thần 3 lớp màu nhưng sai ngôn ngữ hình học: brand book vẽ đường
 * chân trời răng cưa kiểu xé giấy, dải màu phẳng không chồng trong suốt.
 * Bản này vẽ lại bằng đường thẳng gãy góc (không dùng bezier) để đúng chất liệu.
 */
export default function RiceHorizonDivider({ invert = false, className = '', topBg = 'transparent' }) {
  return (
    <div
      className={`horizon-wave-divider ${className}`}
      style={{
        transform: invert ? 'rotate(180deg)' : 'none',
        lineHeight: 0,
        margin: 0,
        padding: 0,
        display: 'block',
        backgroundColor: topBg
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '60px', margin: 0, padding: 0 }}
      >
        {/* Lớp 1: dải hoàng hôn vàng — dải lớn nhất, đường chân trời gãy góc,
            khoảng cách các đỉnh cố ý lệch nhau (180/280/280/140/300/260) để
            không đều nhịp, tránh cảm giác lặp khuôn máy móc */}
        <path
          d="M0,26 L180,20 L460,37 L740,19 L880,33 L1180,21 L1440,36 L1440,80 L0,80 Z"
          fill="var(--golden-light)"
        />
        {/* Lớp 2: dải đất nâu — bám theo lớp vàng với khoảng lệch cố định ~14px
            để dải luôn dày đều, không bị bóp mỏng ở những đoạn lớp vàng xuống thấp */}
        <path
          d="M0,40 L180,34 L460,51 L740,33 L880,47 L1180,35 L1440,50 L1440,80 L0,80 Z"
          fill="var(--earth-brown)"
        />
        {/* Lớp 3: dải đồng lúa xanh tươi — dải nền, luôn dùng xanh lúa sáng, không dùng xanh rừng tối */}
        <path
          d="M0,64 L180,56 L460,69 L740,52 L880,66 L1180,54 L1440,68 L1440,80 L0,80 Z"
          fill="var(--brand-green)"
        />
      </svg>
    </div>
  );
}
