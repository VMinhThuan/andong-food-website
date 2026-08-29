import { productModel } from '../models/productModel.js';
import { categoryModel } from '../models/categoryModel.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

class ProductService {
  getAllProducts(query) {
    return productModel.findAll(query);
  }

  getProductById(id) {
    const product = productModel.findById(id);
    if (!product) throw new Error('Không tìm thấy sản phẩm.');
    return product;
  }

  getProductBySlug(slug) {
    const product = productModel.findBySlug(slug);
    if (!product) throw new Error(`Không tìm thấy sản phẩm có mã slug: ${slug}`);
    return product;
  }

  createProduct(data) {
    if (!data.name) throw new Error('Tên sản phẩm là bắt buộc.');

    const slug = data.slug ? slugify(data.slug) : slugify(data.name);
    
    // Check if category exists
    let categoryName = data.categoryName;
    if (data.categoryId && !categoryName) {
      const cat = categoryModel.findById(data.categoryId);
      if (cat) categoryName = cat.name;
    }

    const productPayload = {
      ...data,
      slug,
      categoryName: categoryName || 'Gạo An Đông',
      images: data.images || {
        main: '/assets/product-gao.png',
        banner: '/assets/banner-gao-3.png'
      },
      cookingSteps: data.cookingSteps || [],
      nutrition: data.nutrition || [],
      info: {
        ingredients: '',
        expiry: '12 tháng kể từ ngày sản xuất',
        declarationNo: '',
        storage: 'Bảo quản nơi khô ráo, thoáng mát và tránh ánh nắng trực tiếp.',
        notice: 'Không sử dụng sản phẩm đã hết hạn hoặc có dấu hiệu ẩm mốc.',
        origin: 'Việt Nam',
        barcode: '',
        ...(data.info || {})
      }
    };

    return productModel.create(productPayload);
  }

  updateProduct(id, updates) {
    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name);
    }
    const updated = productModel.update(id, updates);
    if (!updated) throw new Error('Không tìm thấy sản phẩm để cập nhật.');
    return updated;
  }

  deleteProduct(id) {
    const success = productModel.delete(id);
    if (!success) throw new Error('Không tìm thấy sản phẩm để xóa.');
    return { message: 'Đã xóa sản phẩm thành công.' };
  }
}

export const productService = new ProductService();
