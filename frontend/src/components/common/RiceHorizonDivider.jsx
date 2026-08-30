import React from 'react';

const DEFAULT_IMAGE = '/assets/rice-sunrise.jpg';

/**
 * Đồ họa bổ trợ chính thức của An Đông (Hồ sơ thương hiệu, mục 2.4):
 * "Yếu tố đồ họa được khai thác từ sự phân lớp của khung cảnh đồng lúa khi
 * hoàng hôn hoặc bình minh... dùng để làm khung chứa hình ảnh và có chức
 * năng phân chia bố cục." Trang minh họa đặt song song một hình khối phẳng
 * và một tấm ảnh đồng lúa hoàng hôn thật.
 *
 * Bản trước dùng khối màu phẳng (xem lịch sử component) nhưng bị đánh giá
 * xấu trên thực tế. Bản này đổi sang dùng ảnh thật, cắt theo đúng đường
 * viền gãy góc kiểu "xé giấy" đã tinh chỉnh — giữ đúng ý tưởng "khung chứa
 * hình ảnh" của brand book, ưu tiên độ đẹp hơn là bám cứng cấu trúc 3 dải
 * màu trong bản minh họa gốc.
 *
 * Toạ độ viền dùng đơn vị %, không phải px cố định, để co giãn đúng theo
 * mọi kích thước khung chứa — đã tự kiểm tra bằng Chrome headless ở khổ
 * desktop (1440px) và mobile (390px) trước khi đưa vào đây.
 */
const EDGE_POINTS = [
  [0, 80], [12.5, 70], [31.94, 86.25], [51.39, 65], [61.11, 82.5], [81.94, 67.5], [100, 85]
];

export default function RiceHorizonDivider({ invert = false, className = '', image = DEFAULT_IMAGE, height = 150 }) {
  // invert: lật dọc đường viền (răng cưa quay lên trên) để dùng khi đi từ
  // nền sáng vào nền tối, thay vì xoay nguyên tấm ảnh 180° (sẽ làm ảnh lộn ngược).
  const points = invert ? EDGE_POINTS.map(([x, y]) => [x, 100 - y]) : EDGE_POINTS;
  const clipPath = invert
    ? `polygon(0 100%, 100% 100%, ${[...points].reverse().map(([x, y]) => `${x}% ${y}%`).join(', ')})`
    : `polygon(0 0, 100% 0, ${[...points].reverse().map(([x, y]) => `${x}% ${y}%`).join(', ')})`;

  return (
    <div
      className={`horizon-photo-divider ${className}`}
      style={{ position: 'relative', height: `${height}px`, overflow: 'hidden', margin: 0, padding: 0 }}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 60%',
          clipPath,
          display: 'block'
        }}
      />
    </div>
  );
}
