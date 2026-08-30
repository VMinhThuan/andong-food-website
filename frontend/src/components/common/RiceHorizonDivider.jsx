import React from 'react';

/**
 * Dải phân cách "đồng lúa xé giấy" — theo docs/andofoodredesignspec.md mục 4.
 *
 * Mép rách tạo bằng SVG filter (feTurbulence + feDisplacementMap), không
 * phải toạ độ vẽ tay hay ảnh cắt — nên không lặp khuôn giữa các lần dùng.
 *
 * 2 biến thể màu đáy (đúng gợi ý "bandB/bandC" trong spec — đổi đường cong
 * + màu đáy tuỳ ngữ cảnh, không dùng lặp lại y hệt 1 dải ở mọi nơi):
 *   - variant="toGreen" (mặc định): đáy xanh lúa tươi — dùng khi đoạn dưới
 *     divider là nền sáng/nội dung thường.
 *   - variant="toEarth": đáy nâu đất sẫm #2e2110 — dùng khi đoạn dưới
 *     divider là khối nền tối (chuẩn bị vào footer hoặc section tối).
 *
 * Mỗi lần dùng nên đổi `seed` (số nguyên bất kỳ) để mép rách không giống
 * hệt lần dùng khác trên cùng 1 trang.
 *
 * Lưu ý: <defs> chứa id (torn/grain/band) nên nếu dùng nhiều hơn 1 lần
 * trên cùng một trang, mỗi lần cần 1 idSuffix khác nhau để tránh trùng id.
 *
 * Hoà vào section phía trên: bản đầu có nền kem đặc phủ hết phần trên của
 * dải, nên đỉnh vàng bị chặn bởi một mép hình chữ nhật thẳng cứng phía
 * trên — nhìn như một khối dán thêm, không phải bị "xé" ra. Đã bỏ khối
 * nền kem đặc đó (phần trên trong suốt, cho màu section phía trên hiện
 * xuyên qua các khe hở), đồng thời kéo cả dải chồng ngược lên section phía
 * trên bằng margin-top âm — để chính đỉnh răng cưa vàng là đường cắt thật
 * sự, cắn thẳng vào section trên thay vì có một mép thẳng ở giữa.
 */
const CURVES = {
  toGreen: {
    gold: 'M-30,34 C120,24 240,42 360,31 C480,21 600,40 720,29 C840,21 960,42 1080,32 C1200,24 1320,40 1470,30 L1470,130 L-30,130 Z',
    brown: 'M-30,66 C160,57 300,74 460,64 C620,55 780,72 940,63 C1100,56 1280,73 1470,65 L1470,130 L-30,130 Z',
    base: 'M-30,80 C150,73 320,88 480,78 C640,70 800,86 960,77 C1120,71 1300,87 1470,78 L1470,130 L-30,130 Z',
    baseColor: '#2f9e43'
  },
  toEarth: {
    gold: 'M-30,28 C180,40 340,18 500,32 C660,44 820,22 980,34 C1140,46 1300,24 1470,36 L1470,130 L-30,130 Z',
    brown: 'M-30,60 C200,72 380,52 560,64 C740,74 900,56 1080,66 C1260,76 1360,58 1470,62 L1470,130 L-30,130 Z',
    base: 'M-30,76 C190,86 360,68 540,80 C720,90 880,72 1060,82 C1240,92 1350,74 1470,80 L1470,130 L-30,130 Z',
    baseColor: '#2e2110'
  }
};

export default function RiceHorizonDivider({ className = '', height = 104, overlap = 34, idSuffix = '', variant = 'toGreen', seed = 11 }) {
  const tornId = `torn${idSuffix}`;
  const grainId = `grain${idSuffix}`;
  const bandId = `bandA${idSuffix}`;
  const curve = CURVES[variant] || CURVES.toGreen;

  return (
    <div
      className={`horizon-torn-divider ${className}`}
      style={{ display: 'block', lineHeight: 0, margin: 0, padding: 0, position: 'relative', zIndex: 2, marginTop: `-${overlap}px` }}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id={tornId} x="-3%" y="-40%" width="106%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.09" numOctaves="4" seed={seed} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={grainId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.19  0 0 0 0 0.07  0 0 0 0.5 0" />
          </filter>
          {/* Lát cắt: vàng lớn -> nâu (hàng cây) mỏng -> đáy (xanh lúa hoặc đất).
              Không còn rect nền kem đặc phía trên — phần trên trong suốt, để
              màu section phía trên hiện xuyên qua các khe hở của mép rách. */}
          <symbol id={bandId} viewBox="0 0 1440 100" preserveAspectRatio="none">
            <g filter={`url(#${tornId})`}>
              {/* stroke cùng màu fill để vá các khe hở li ti mà feDisplacementMap
                  tạo ra khi độ lệch (scale=22) đẩy 2 điểm gần nhau trên cùng 1
                  path tách rời — không có backing kem đặc phía sau nên khe hở
                  lộ ra thành đường trắng mảnh dọc mép, thay vì vô hình như bản
                  cũ. Đã tự kiểm tra 6px chưa đủ, 10px vá kín hoàn toàn. */}
              <path d={curve.gold} fill="#fdb913" stroke="#fdb913" strokeWidth="10" />
              <path d={curve.brown} fill="#754c1f" stroke="#754c1f" strokeWidth="10" />
              <path d={curve.base} fill={curve.baseColor} stroke={curve.baseColor} strokeWidth="10" />
            </g>
            <rect width="1440" height="100" filter={`url(#${grainId})`} opacity="0.05" />
          </symbol>
        </defs>
      </svg>

      <svg
        className="band"
        aria-hidden="true"
        style={{ display: 'block', width: '100%', height: `${height}px`, filter: 'drop-shadow(0 4px 3px rgba(74,45,15,.16))' }}
      >
        <use href={`#${bandId}`} />
      </svg>
    </div>
  );
}
