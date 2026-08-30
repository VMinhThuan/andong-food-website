import React from 'react';

/**
 * Dải phân cách "đồng lúa xé giấy" — theo docs/andofoodredesignspec.md mục 4.
 *
 * Khác với 2 bản trước (khối màu vẽ tay bằng toạ độ cố định, rồi ảnh thật
 * cắt bằng clip-path cố định), bản này tạo mép rách bằng SVG filter
 * (feTurbulence + feDisplacementMap) — mép rách sinh ra từ nhiễu ngẫu
 * nhiên có tham số, không phải toạ độ vẽ tay, nên không lặp khuôn giữa
 * các lần dùng và không cần ảnh gốc nào.
 *
 * Lưu ý: <defs> chứa id (torn/grain/bandA) nên nếu dùng component này
 * nhiều hơn 1 lần trên cùng một trang, cần đổi idSuffix cho mỗi lần để
 * tránh trùng id trong DOM (SVG id phải duy nhất).
 */
export default function RiceHorizonDivider({ className = '', height = 104, idSuffix = '' }) {
  const tornId = `torn${idSuffix}`;
  const grainId = `grain${idSuffix}`;
  const bandId = `bandA${idSuffix}`;

  return (
    <div className={`horizon-torn-divider ${className}`} style={{ display: 'block', lineHeight: 0, margin: 0, padding: 0 }}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id={tornId} x="-3%" y="-40%" width="106%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.09" numOctaves="4" seed="11" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={grainId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.19  0 0 0 0 0.07  0 0 0 0.5 0" />
          </filter>
          {/* Lát cắt: trời kem -> vàng lớn -> nâu (hàng cây) mỏng -> ruộng xanh */}
          <symbol id={bandId} viewBox="0 0 1440 100" preserveAspectRatio="none">
            <g filter={`url(#${tornId})`}>
              <rect x="-30" y="-30" width="1500" height="160" fill="#FFF8DD" />
              <path d="M-30,34 C120,24 240,42 360,31 C480,21 600,40 720,29 C840,21 960,42 1080,32 C1200,24 1320,40 1470,30 L1470,130 L-30,130 Z" fill="#fdb913" />
              <path d="M-30,66 C160,57 300,74 460,64 C620,55 780,72 940,63 C1100,56 1280,73 1470,65 L1470,130 L-30,130 Z" fill="#754c1f" />
              <path d="M-30,80 C150,73 320,88 480,78 C640,70 800,86 960,77 C1120,71 1300,87 1470,78 L1470,130 L-30,130 Z" fill="#2f9e43" />
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
