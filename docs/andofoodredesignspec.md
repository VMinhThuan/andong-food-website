# Brief tinh chỉnh giao diện — andofood.vn (An Đông Food)

> Tài liệu này để đưa cho coding agent thực thi. Mục tiêu: giữ nền tảng kỹ thuật hiện có, nhưng **bớt cảm giác template/"AI"** và **kéo đúng nhận diện An Đông** lên web. Ưu tiên mobile & trang chi tiết sản phẩm (đích của luồng QR).

---

## 0\. Nguyên tắc xuyên suốt (đọc trước khi code)

1. **Bớt, đừng thêm.** Giảm card, box, bóng đổ; tăng khoảng trắng. Thay "bọc mọi thứ trong thẻ" bằng viền mảnh \+ divider \+ đoạn văn.  
2. **Mỗi trang chỉ 1 lưới thẻ (card grid).** Các khối còn lại chuyển sang đoạn văn hoặc danh sách nhẹ.  
3. **Chỉ đánh số (01, 02…) khi là trình tự thật.** Giữ ở "Quy trình sản xuất". Bỏ ở "Giá trị", "Tầm nhìn/Sứ mệnh", "Tính năng QR".  
4. **Nền chủ đạo là KEM `#FFF8DD`,** không phải trắng lạnh; không nhuộm nguyên khối xanh đậm.  
5. **Dùng tài sản riêng của brand:** minh hoạ vẽ tay, motif đồng lúa xé giấy, chữ tay Mansalva (có chủ đích, ≤ 2 lần/trang).  
6. **Mobile-first;** trang chi tiết sản phẩm là màn hình quan trọng nhất.

---

## 1\. Design tokens (dán vào `:root`)

:root{

  /\* Màu lấy từ brand book An Đông \*/

  \--paper:\#FFF8DD;      /\* nền kem chủ đạo \*/

  \--panel:\#FFFEF2;      /\* kem sáng cho thẻ \*/

  \--ink:\#402d13;        /\* chữ nâu-đen ấm \*/

  \--ink-soft:\#6b5836;   /\* chữ phụ \*/

  \--line:rgba(117,76,31,.20); /\* viền mảnh trên nền kem \*/

  \--green:\#2f9e43;      /\* xanh nhấn (PANTONE 361C) \*/

  \--green-deep:\#0e7c3a;

  \--yellow:\#fdb913;     /\* PANTONE 1235C \*/

  \--orange:\#f99d1b;     /\* PANTONE 1375C \*/

  \--brown:\#754c1f;      /\* PANTONE 1405C \*/

  \--earth:\#2e2110;      /\* nền đất (footer) \*/

  \--radius:16px;

  \--shadow:none;        /\* mặc định KHÔNG shadow; nếu cần chỉ 0 6px 16px \-10px rgba(74,45,15,.18) \*/

  \--maxw-text:66ch;     /\* độ rộng cột chữ dễ đọc \*/

  \--space:clamp(56px,10vw,120px); /\* padding dọc giữa các section \*/

  \--f-display:"Ysabeau Office","Times New Roman",serif;

  \--f-body:"Quicksand",system-ui,sans-serif;

  \--f-hand:"Mansalva","Segoe Script",cursive;

}

body{background:var(--paper);color:var(--ink);font-family:var(--f-body);font-weight:500}

---

## 2\. Typography

Cài đúng 3 font của brand (Google Fonts):

\<link rel="stylesheet"

  href="https://fonts.googleapis.com/css2?family=Ysabeau+Office:wght@500;700\&family=Quicksand:wght@500;700\&family=Mansalva\&display=swap"\>

| Vai trò | Font | Dùng cho |
| :---- | :---- | :---- |
| Tiêu đề | **Ysabeau Office** (700) | H1–H3, tiêu đề nhấn |
| Nội dung | **Quicksand** (500/700) | Body, nút, nhãn, caption |
| Chữ tay nhấn | **Mansalva** | 1–2 câu cảm xúc/trang ("gửi trọn", "an lòng") — KHÔNG dùng cho body |

- Type scale gợi ý: H1 `clamp(2.3rem,6vw,3.6rem)`, H2 `clamp(1.7rem,4.2vw,2.5rem)`, H3 `1.2rem`, body `18px/1.7`.  
- Nhãn viết hoa (eyebrow) thêm `letter-spacing:.18em`. Tiêu đề `text-wrap:balance`.  
- Body giữ khoảng `--maxw-text` (\~65 ký tự/dòng), ưu tiên canh trái.

---

## 3\. Nền & bố cục toàn cục

- Đổi mọi nền trắng → `--paper`. Bỏ các section nhuộm nguyên khối `--green` đậm; xanh chỉ dùng cho tiêu đề nhấn, nút, icon, viền.  
- `box-shadow` mặc định `none`. Phân tách khối bằng **viền mảnh `--line`** hoặc **dải phân cách đồng lúa** (mục 4), không bằng bóng đổ.  
- Tăng `padding` dọc giữa section \= `--space`. Cho nội dung "thở".  
- (Tuỳ chọn, khuyến nghị) **Hiệu ứng cuộn đổi nền trời → đất** — xem Phụ lục B.

---

## 4\. Component A — Dải phân cách "đồng lúa xé giấy" (thay mọi `<hr>`/divider)

Đây là chất riêng chống "đại trà" mạnh nhất. Mép xé tạo bằng SVG filter (không cần ảnh). Đặt `<defs>` một lần trong layout, rồi tái dùng `<use>`.

\<\!-- defs: đặt 1 lần, ẩn \--\>

\<svg width="0" height="0" style="position:absolute" aria-hidden="true"\>\<defs\>

  \<filter id="torn" x="-3%" y="-40%" width="106%" height="180%"\>

    \<feTurbulence type="fractalNoise" baseFrequency="0.008 0.09" numOctaves="4" seed="11" result="n"/\>

    \<feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G"/\>

  \</filter\>

  \<filter id="grain"\>

    \<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/\>

    \<feColorMatrix type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.19  0 0 0 0 0.07  0 0 0 0.5 0"/\>

  \</filter\>

  \<\!-- Lát cắt: trời kem \-\> vàng lớn \-\> nâu (hàng cây) mỏng \-\> ruộng xanh \--\>

  \<symbol id="bandA" viewBox="0 0 1440 100" preserveAspectRatio="none"\>

    \<g filter="url(\#torn)"\>

      \<rect x="-30" y="-30" width="1500" height="160" fill="\#FFF8DD"/\>

      \<path d="M-30,34 C120,24 240,42 360,31 C480,21 600,40 720,29 C840,21 960,42 1080,32 C1200,24 1320,40 1470,30 L1470,130 L-30,130 Z" fill="\#fdb913"/\>

      \<path d="M-30,66 C160,57 300,74 460,64 C620,55 780,72 940,63 C1100,56 1280,73 1470,65 L1470,130 L-30,130 Z" fill="\#754c1f"/\>

      \<path d="M-30,80 C150,73 320,88 480,78 C640,70 800,86 960,77 C1120,71 1300,87 1470,78 L1470,130 L-30,130 Z" fill="\#2f9e43"/\>

    \</g\>

    \<rect width="1440" height="100" filter="url(\#grain)" opacity="0.05"/\>

  \</symbol\>

\</defs\>\</svg\>

\<\!-- dùng ở giữa các section \--\>

\<svg class="band" aria-hidden="true"\>\<use href="\#bandA"/\>\</svg\>

.band{display:block;width:100%;height:104px;filter:drop-shadow(0 4px 3px rgba(74,45,15,.16))}

Ghi chú kỹ thuật:

- `baseFrequency` bất đối xứng (`0.008 0.09`) → rách theo phương ngang (giống hàng cây/giấy). `scale` \= độ rách (18–24). Đổi `seed` cho mỗi dải để không lặp.  
- Có thể tạo thêm `bandB` (seed/đường cong khác) và `bandC` (đáy chuyển sang `#2e2110` để "hạ" vào footer đất).  
- Thứ tự màu \= lát cắt hoàng hôn ruộng lúa của brand: **trời kem → vàng (lớn) → nâu (mỏng) → xanh (đáy)**. Không đảo mỏng thành ruy-băng.

---

## 5\. Component B — Thẻ (card) quy chuẩn mới

Thay "glass card xanh đậm \+ shadow \+ icon bo tròn" bằng:

.card{

  background:var(--panel);

  border:1.5px solid var(--line);

  border-radius:var(--radius);

  box-shadow:var(--shadow);           /\* none \*/

  padding:24px;

}

.card .icon{width:40px;height:40px;color:var(--green);  /\* icon NÉT MẢNH, không nền bo tròn \*/}

.card h3{font-family:var(--f-display);color:var(--brown)}

/\* KHÔNG đặt số 01/02 trang trí ở góc thẻ (trừ khi là trình tự thật) \*/

---

## 6\. Thay đổi theo từng trang

### 6.1 Trang chủ

- **Hero:** một CTA chính nổi bật \= **"Xem sản phẩm"**; nút phụ ("Câu chuyện") làm dạng viền/mờ. Bổ sung hành động **mua ở đâu** (link sàn TMĐT / Zalo / hotline). Overlay tối đủ dưới chữ để đạt tương phản. Nếu hero là carousel: có nút điều khiển, không auto-rotate quá nhanh.  
- **Bộ 4 giá trị (Chân thật/Chu đáo/Trách nhiệm/Bền bỉ):** hiện đang lặp 2 lần (chip ở hero \+ section riêng) → **giữ 1 lần**.  
- **Khối "tính năng" (Gạo sạch / Nguồn gốc / Thơm ngon / Vì sức khoẻ):** đổi từ glass card → hàng **icon nét mảnh** trên nền kem, không bóng đổ.  
- **Product cards:** BỎ dùng thumbnail sàn TMĐT (ảnh có "Gian hàng chính hãng / Voucher freeship"). Thay bằng **pack shot sạch** trên nền kem/mâm gỗ. Thẻ theo mục 5\.  
- **Quy trình sản xuất (5 bước):** GIỮ đánh số 01–05 (trình tự thật) nhưng đổi nền kem \+ minh hoạ vẽ tay, bỏ nền xanh đậm.  
- **Giá trị An Đông / Tầm nhìn – Sứ mệnh:** BỎ đánh số, chuyển sang đoạn văn hoặc list nhẹ; gộp bớt phần trùng ý với "Câu chuyện thương hiệu".  
- Chèn **1–2 câu Mansalva cỡ lớn** trên nền ruộng (ví dụ *"Bình an hiện diện trong từng bữa cơm được chăm chút mỗi ngày."*) thay vì nhét trong box.

### 6.2 Trang danh sách sản phẩm

- Lưới thẻ pack shot sạch: ảnh đại diện, tên, loại gạo, mô tả ngắn, nút "Xem chi tiết". Theo component thẻ mục 5\.

### 6.3 Trang chi tiết sản phẩm — QUAN TRỌNG NHẤT (đích QR)

- **Mobile-first \+ tải nhanh** (người quét QR đứng ở siêu thị, mạng yếu).  
- **Thứ tự nội dung ưu tiên:** Ảnh sản phẩm → Tên → Đặc điểm nổi bật → **Hướng dẫn nấu (vo gạo, tỷ lệ nước)** → nút Mua/Liên hệ. Đưa thông tin gạo **lên trước**, marketing thương hiệu xuống dưới.  
- Mỗi sản phẩm có **URL riêng** (vd `/san-pham/gao-st25`) \+ `<title>` riêng \+ **ảnh Open Graph riêng** để chia sẻ QR/link lên Zalo, Facebook hiển thị đúng tên & ảnh gạo.  
- Đây là trang để tạo QR trên bao bì → đầu tư kỹ nhất về tốc độ và bố cục.

### 6.4 Trang giới thiệu / liên hệ

- **Liên hệ:** hotline `0944 852 464`, Zalo, email `andongfoodvn@gmail.com`, địa chỉ *Ấp Long Thành, xã Phước Long, Cà Mau* \+ **Google Maps nhúng**. Thêm chứng nhận/tiêu chuẩn nếu có (ngành thực phẩm → minh bạch là điểm bán).

---

## 7\. UX & hành vi

- **Gộp thanh nổi:** hiện có nav trên \+ thanh liên hệ dưới \+ nút "lên đầu" nổi cùng lúc, ăn diện tích mobile → giảm còn 1–2 (cho thanh liên hệ chìm vào footer, hoặc gộp Zalo/hotline vào 1 nút nổi).  
- **Thêm CTA mua hàng thật** (hiện chỉ có "Khám phá", không có đường mua).  
- **Cắt nội dung lặp** (giá trị ×2; câu chuyện vs tầm nhìn/sứ mệnh trùng ý) để trang ngắn, đỡ mỏi cuộn.

---

## 8\. Accessibility (bắt buộc)

- Tương phản chữ đạt **WCAG AA ≥ 4.5:1**. Chữ trên ảnh phải có lớp phủ tối đủ; tránh vàng nhạt trên nền kem.  
- `:focus-visible` rõ ràng cho mọi phần tử tương tác.  
- `alt` mô tả cho ảnh sản phẩm/minh hoạ.  
- Tôn trọng `prefers-reduced-motion`: tắt hiệu ứng cuộn/animation.

---

## 9\. Hiệu năng & SEO

- Nén ảnh, xuất **WebP/AVIF**, `loading="lazy"` cho ảnh dưới màn đầu; ảnh hero đúng kích thước, không tải file gốc nặng.  
- Mỗi trang sản phẩm: `<title>`, `meta description`, **OG image** riêng.  
- `sitemap.xml`, URL sạch dạng `/san-pham/<slug>` để gắn QR.  
- Mục tiêu: LCP \< 2.5s trên 4G, đặc biệt trang chi tiết.

---

## 10\. Thứ tự triển khai (ưu tiên "đổi nhiều / công ít")

1. Đổi nền kem \+ giảm card/shadow (chỉ CSS, đổi cảm giác ngay).  
2. Cài đúng 3 font brand \+ dùng Mansalva có chủ đích.  
3. Thay ảnh sản phẩm bằng pack shot sạch; bỏ thumbnail sàn.  
4. Tối ưu trang chi tiết sản phẩm (mobile · nhanh · thông tin trước marketing · OG riêng).  
5. Đưa minh hoạ vẽ tay \+ dải đồng lúa xé giấy vào làm divider/nền.  
6. Gộp thanh nổi \+ thêm CTA mua hàng.

---

## 11\. Tiêu chí nghiệm thu (checklist)

- [ ] Không còn thumbnail sàn TMĐT (voucher/freeship) trên website.  
- [ ] Nền chủ đạo là kem `#FFF8DD`; không còn section nhuộm nguyên khối xanh đậm; shadow tối giản.  
- [ ] Mỗi trang có **≤ 1 lưới thẻ**; số thứ tự **chỉ** xuất hiện ở "Quy trình sản xuất".  
- [ ] 3 font brand tải đúng; Mansalva xuất hiện **≤ 2 lần/trang**, không dùng cho body.  
- [ ] Divider giữa các khối dùng motif đồng lúa xé giấy (SVG mục 4).  
- [ ] Bộ 4 giá trị chỉ hiện 1 lần; đã cắt nội dung trùng.  
- [ ] Hero có 1 CTA chính \+ đường "mua ở đâu"; overlay chữ đạt AA.  
- [ ] Trang chi tiết: trên mobile, thông tin gạo (ảnh/tên/đặc điểm/hướng dẫn nấu) nằm trong màn hình đầu; LCP \< 2.5s.  
- [ ] Mỗi sản phẩm có URL \+ title \+ OG image riêng.  
- [ ] Chỉ còn 1–2 thanh nổi trên mobile.  
- [ ] Lighthouse Accessibility ≥ 90; `prefers-reduced-motion` được tôn trọng.

---

## Phụ lục A — Bảng đối chiếu brand vs web (bối cảnh)

| Yếu tố | Brand book | Web hiện tại | Cần sửa thành |
| :---- | :---- | :---- | :---- |
| Nền | Kem ấm `#FFF8DD` | Trắng \+ khối xanh đậm | Kem ấm |
| Chữ | Ysabeau \+ Quicksand \+ Mansalva | Font hệ thống chung chung | Đúng 3 font brand |
| Đồ hoạ | Minh hoạ vẽ tay \+ đồng lúa xé giấy | Ảnh stock \+ icon generic | Illustration \+ motif xé giấy |
| Ảnh SP | Pack shot / mockup sạch | Thumbnail sàn TMĐT | Pack shot sạch |
| Cảm giác | Quê, ấm, có bàn tay người | Công nghệ, lạnh, vô danh | Ấm, mộc, riêng |

## Phụ lục B — (Tuỳ chọn) Hiệu ứng cuộn "trời xuống đất"

Nền trang nội suy màu theo % cuộn: trời kem → vàng bình minh → ruộng xanh; footer là nền đất sẫm (chữ đổi sang kem). Một lớp `#ground` cố định phía sau, JS đổi màu.

\<div id="ground"\>\</div\>  \<\!-- position:fixed; inset:0; z-index:-1; transition:background-color .18s linear \--\>

const stops=\[{p:0,c:\[255,248,221\]},{p:.34,c:\[251,235,176\]},{p:.66,c:\[228,228,166\]},{p:1,c:\[203,224,164\]}\];

const lerp=(a,b,t)=\>Math.round(a+(b-a)\*t);

const ground=document.getElementById('ground');

const footerTop=()=\>document.querySelector('footer').offsetTop;

function colorAt(g){for(let i=1;i\<stops.length;i++){if(g\<=stops\[i\].p){const a=stops\[i-1\],b=stops\[i\],t=(g-a.p)/(b.p-a.p);

  return \`rgb(${lerp(a.c\[0\],b.c\[0\],t)},${lerp(a.c\[1\],b.c\[1\],t)},${lerp(a.c\[2\],b.c\[2\],t)})\`;}}return 'rgb(203,224,164)';}

function onScroll(){const max=footerTop()-innerHeight;const g=Math.min(1,Math.max(0,scrollY/Math.max(1,max)));

  ground.style.backgroundColor=colorAt(g);}

if(matchMedia('(prefers-reduced-motion: reduce)').matches){ground.style.backgroundColor='rgb(246,237,190)';}

else{let t=false;addEventListener('scroll',()=\>{if(\!t){requestAnimationFrame(()=\>{onScroll();t=false;});t=true;}},{passive:true});

  addEventListener('resize',onScroll);onScroll();}

**Lưu ý:** giữ dãy nền ở tông sáng để chữ nâu đậm luôn đọc được; chỉ footer mới là nền đất sẫm \+ chữ kem. Không để nền chạy tới màu bão hoà dưới chữ tối. Có bản CSS thuần bằng `animation-timeline: scroll()` nhưng 2026 Safari/Firefox hỗ trợ chưa đều → dùng bản JS trên cho an toàn.

---

*Nguồn: An Đông Brand Profile, Product Content Master, Báo cáo đề xuất website An Đông Food, khảo sát andofood.vn (30/08/2026).*  
