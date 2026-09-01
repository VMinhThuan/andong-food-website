import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'An Đông Food – Gạo Ngon Chuẩn Giống | Gửi Trọn An Lòng';
const DEFAULT_DESCRIPTION = 'An Đông Food cung cấp Gạo ST25 chuẩn ngon nhất thế giới và Gạo Vuông Tôm sinh thái tự nhiên. Gạo sạch chuẩn giống, thơm dẻo đậm vị, minh bạch nguồn gốc.';
const DEFAULT_KEYWORDS = 'An Đông, Gạo An Đông, Gạo ST25, Gạo Vuông Tôm, Gạo sạch, Gạo ngon, Gạo đặc sản';
const BASE_URL = 'https://www.andofood.vn';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/jeuco62x/image/upload/v1788253748/andong_food/products/ecom-st25.svg';

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema
}) {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;
  const fullTitle = title ? `${title} | An Đông Food` : DEFAULT_TITLE;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMeta = (attr, key, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);

    // 3. Open Graph Meta Tags
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', type);

    // 4. Twitter Meta Tags
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 6. Custom JSON-LD Schema
    let schemaScript = document.getElementById('page-dynamic-schema');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-dynamic-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Cleanup custom schema on unmount if needed
      const oldScript = document.getElementById('page-dynamic-schema');
      if (oldScript) oldScript.remove();
    };
  }, [fullTitle, description, keywords, image, type, canonicalUrl, schema]);

  return null;
}
