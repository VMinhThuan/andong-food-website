import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Tự động cuộn trang lên vị trí đầu trang (x: 0, y: 0) mỗi khi người dùng chuyển trang / chuyển tab
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Cuộn tức thì lên đầu trang ngay khi chuyển tab
    });
  }, [pathname]);

  return null;
}
