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

  async getProductById(id) {
    const product = await productModel.findById(id);
    if (!product) throw new Error('Không tìm thấy sản phẩm.');
    return product;
  }

  async getProductBySlug(slug) {
    const product = await productModel.findBySlug(slug);
    if (!product) throw new Error(`Không tìm thấy sản phẩm có mã slug: ${slug}`);
    return product;
  }

  async createProduct(data) {
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
      categoryName: categoryName || '',
      images: data.images || {},
      packSizes: data.packSizes || [],
      /**
       * Không gán giá trị mặc định cho vùng trồng, thông số kỹ thuật hay
       * chứng nhận. Trước đây chỗ này tự điền sẵn "VietGAP / VIETGAP-VN-2026",
       * hợp tác xã và vùng nguyên liệu tưởng tượng cho mọi sản phẩm mới —
       * tức là công bố thông tin chất lượng không có thật.
       * Các trường này chỉ được điền bằng dữ liệu có hồ sơ kèm theo.
       */
      certifications: data.certifications || []
    };

    return await productModel.create(productPayload);
  }

  async updateProduct(id, updates) {
    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name);
    }
    const updated = await productModel.update(id, updates);
    if (!updated) throw new Error('Không tìm thấy sản phẩm để cập nhật.');
    return updated;
  }

  async deleteProduct(id) {
    const success = await productModel.delete(id);
    if (!success) throw new Error('Không tìm thấy sản phẩm để xóa.');
    return { message: 'Đã xóa sản phẩm thành công.' };
  }
}

export const productService = new ProductService();
