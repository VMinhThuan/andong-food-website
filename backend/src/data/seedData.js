import bcrypt from 'bcryptjs';

/**
 * NGUỒN SỰ THẬT: nội dung in trên bao bì An Đông Food đã duyệt.
 *
 * Nguyên tắc: KHÔNG tự chế dữ liệu. Trường nào bao bì không có thì để trống,
 * kèm ghi chú cần bổ sung. Tuyệt đối không điền số chứng nhận, số công bố hay
 * mã vạch bằng cách suy đoán.
 */

// Mật khẩu mặc định — PHẢI đổi trước khi chạy thật (xem BM-02).
const adminPasswordHash = bcrypt.hashSync('admin123', 10);
const staffPasswordHash = bcrypt.hashSync('staff123', 10);

export const initialUsers = [
  {
    id: 'usr_admin_01',
    username: 'admin',
    email: 'andofoodvn@gmail.com',
    password: adminPasswordHash,
    fullName: 'Quản Trị Viên An Đông',
    role: 'admin',
    avatar: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr_staff_01',
    username: 'nhanvien',
    email: '',
    password: staffPasswordHash,
    fullName: 'Nhân Viên An Đông',
    role: 'staff',
    avatar: '',
    createdAt: new Date().toISOString()
  }
];

export const initialCategories = [
  {
    id: 'cat_dac_san',
    name: 'Gạo Đặc Sản',
    slug: 'gao-dac-san',
    description: 'Các dòng gạo đặc sản của An Đông Food',
    order: 1
  }
];

// Thông tin nhà sản xuất — lấy nguyên văn từ khối MANUFACTURER trên bao bì.
const manufacturer = {
  name: 'CÔNG TY TNHH AN ĐÔNG FOOD',
  address: 'Ấp Long Thành, xã Phước Long, tỉnh Cà Mau',
  addressEn: 'Long Thanh Hamlet, Phuoc Long Commune, Ca Mau Province',
  email: 'andofoodvn@gmail.com',
  phone: '0944 852 464',
  // CẦN BỔ SUNG: mã số doanh nghiệp / MST — bắt buộc công bố trên website
  // theo Nghị định 52/2013/NĐ-CP (sửa đổi bởi Nghị định 85/2021/NĐ-CP).
  taxCode: ''
};

// 4 bước nấu giống nhau ở cả hai sản phẩm (theo bao bì).
const cookingSteps = [
  {
    step: 1,
    titleVi: 'VO GẠO',
    descVi: 'Đong gạo vào nồi. Vo gạo bằng nước sạch.',
    titleEn: 'RINSE THE RICE',
    descEn: 'Measure the rice into the pot. Rinse with clean water.'
  },
  {
    step: 2,
    titleVi: 'THÊM NƯỚC',
    descVi: 'Cho nước vào nồi với tỷ lệ nước và gạo là 1:1.',
    titleEn: 'ADD WATER',
    descEn: 'Add water at a 1:1 water-to-rice ratio.'
  },
  {
    step: 3,
    titleVi: 'NẤU CƠM',
    descVi: 'Khi nấu cơm, không mở nắp cho đến khi cơm chín.',
    titleEn: 'COOK',
    descEn: 'Keep the lid closed until the rice is fully cooked.'
  },
  {
    step: 4,
    titleVi: 'THƯỞNG THỨC',
    descVi: 'Cơm chín, để cơm nghỉ khoảng 5 phút rồi xới đều trước khi dùng.',
    titleEn: 'SERVE',
    descEn: 'Once cooked, let the rice rest for about 5 minutes, then fluff well before serving.'
  }
];

/**
 * Bảng dinh dưỡng đang ghi theo bao bì hiện tại.
 *
 * CẢNH BÁO: đơn vị trên bao bì là "%" cho đạm / chất béo / carbohydrate.
 * Ghi nhãn dinh dưỡng phải dùng g/100 g và nêu giá trị cụ thể thay vì khoảng
 * (Thông tư 29/2023/TT-BYT). Cần kết quả kiểm nghiệm để chốt số chính thức,
 * sau đó sửa cả bao bì lẫn dữ liệu này.
 */
const nutritionPer100g = {
  basis: '100 g',
  energy: '320–400 kcal',
  protein: '6–8%',
  fat: '0,5–0,8%',
  carbohydrate: '75–85%',
  needsLabReview: true
};

const commonLabel = {
  expiry: '12 tháng kể từ ngày sản xuất',
  expiryEn: '12 months from the date of manufacture',
  storageGuide: 'Bảo quản nơi khô ráo, thoáng mát và tránh ánh nắng trực tiếp.',
  storageGuideEn: 'Store in a cool, dry place away from direct sunlight.',
  notice: 'Không sử dụng sản phẩm đã hết hạn hoặc có dấu hiệu ẩm mốc.',
  noticeEn: 'Do not consume if expired or if there are any signs of mold.',
  originCountry: 'Việt Nam',
  originCountryEn: 'Made in Vietnam',
  // CẦN BỔ SUNG: khối lượng tịnh và số lô — hai thông tin bắt buộc trên nhãn
  // theo Nghị định 43/2017/NĐ-CP (sửa đổi bởi Nghị định 111/2021/NĐ-CP).
  netWeight: '',
  /**
   * Mã vạch để trống có chủ đích.
   * Bao bì đang in "0 651294 378024 3": sai số kiểm tra ở cả hai cách đọc
   * (EAN-13 và GTIN-14 đều phải kết thúc bằng 5), và tiền tố 065 thuộc dải
   * Mỹ/Canada trong khi sản phẩm ghi Made in Vietnam — mã Việt Nam bắt đầu
   * bằng 893. Chỉ điền lại sau khi có mã do GS1 Việt Nam cấp.
   */
  barcode: '',
  certifications: [] // Chỉ thêm khi có bản scan chứng nhận thật.
};

export const initialProducts = [
  {
    id: 'prod_st25',
    code: 'AD-ST25-01', // mã nội bộ, không phải mã vạch
    name: 'Gạo ST25',
    nameEn: 'ST25 Rice',
    slug: 'gao-st25',
    categoryId: 'cat_dac_san',
    categoryName: 'Gạo Đặc Sản',
    originalPrice: 259000,
    listedPrice: 259000,
    promotionalPrice: 215000,
    price: 215000,
    unit: 'túi 5kg',
    summary: 'Gạo ST25 thuần được gieo trồng trên vùng đất màu mỡ, mang phẩm chất của giống gạo Việt từng được vinh danh “Gạo ngon nhất thế giới” năm 2023 tại Cebu, Philippines. Hạt thon dài, thơm tự nhiên, cho cơm dẻo mềm và vị ngọt thanh.',
    summaryEn: 'Grown in fertile lands, pure ST25 rice carries the qualities of the Vietnamese variety recognized as “World’s Best Rice” in 2023 in Cebu, Philippines. Its long, slender grains are naturally aromatic, cooking into soft, tender rice with a delicate sweetness.',
    ingredients: '100% gạo trắng thuần ST25.',
    ingredientsEn: '100% Pure ST25 White Rice.',
    declarationNo: '01/ANDONG-ST25/2026',
    nutrition: nutritionPer100g,
    cookingSteps,
    ...commonLabel,
    manufacturer,
    images: {
      main: '/assets/brand-element/mat-truoc-bao-bi.webp',
      front: '/assets/brand-element/mat-truoc-bao-bi.webp',
      back: '/assets/brand-element/mat-sau-bao-bi.webp',
      ecom: 'https://res.cloudinary.com/jeuco62x/image/upload/v1788253748/andong_food/products/ecom-st25.svg',
      chinhDien: 'https://res.cloudinary.com/jeuco62x/image/upload/v1788254853/andong_food/products/chinh-dien-st25.svg'
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: 'prod_vuong_tom',
    code: 'AD-VT-02',
    name: 'Gạo Vuông Tôm',
    nameEn: 'Rice–Shrimp Rice',
    slug: 'gao-vuong-tom',
    categoryId: 'cat_dac_san',
    categoryName: 'Gạo Đặc Sản',
    originalPrice: 249000,
    listedPrice: 249000,
    promotionalPrice: 195000,
    price: 195000,
    unit: 'túi 5kg',
    summary: 'Gạo Vuông Tôm được gieo trồng theo mô hình luân canh lúa – tôm, thuận theo nhịp nước mặn – ngọt tự nhiên của miền Tây. Hạt gạo mang hương thơm dịu, cơm dẻo mềm và vị ngọt thanh đặc trưng – kết tinh từ sự hài hòa giữa đất, nước và mùa vụ.',
    summaryEn: 'Rice–Shrimp Rice is grown through a traditional rice–shrimp rotation, following the natural rhythm of fresh and brackish water in the Mekong Delta. This unique ecosystem produces naturally aromatic grains with a soft, tender texture and delicate sweetness.',
    ingredients: '100% gạo trắng Vuông Tôm.',
    ingredientsEn: '100% Pure Rice–Shrimp Rice.',
    declarationNo: '',
    nutrition: nutritionPer100g,
    cookingSteps,
    ...commonLabel,
    manufacturer,
    images: {
      main: '/assets/brand-element/mat-truoc-bao-bi.webp',
      front: '/assets/brand-element/mat-truoc-bao-bi.webp',
      back: '/assets/brand-element/mat-sau-bao-bi.webp',
      ecom: 'https://res.cloudinary.com/jeuco62x/image/upload/v1788253760/andong_food/products/ecom-vuongtom.svg',
      chinhDien: 'https://res.cloudinary.com/jeuco62x/image/upload/v1788254856/andong_food/products/chinh-dien-vuongtom.svg'
    },
    isFeatured: true,
    inStock: true
  }
];

export const initialCompany = {
  name: 'CÔNG TY TNHH AN ĐÔNG FOOD',
  shortName: 'An Đông',
  slogan: 'Bình An Ở Phía Đông – Gạo Ngon Chuẩn Giống, Gửi Trọn An Lòng',
  brandStory: {
    title: 'Câu Chuyện Thương Hiệu An Đông',
    meaning: '“Đông” đại diện cho sự bền bỉ để đi qua những mùa khó khăn, còn “An” là sự bình an muốn dành cho người mình thương.',
    content: 'An Đông ra đời từ niềm tin rằng mỗi bữa cơm gia đình là sợi dây gắn kết thiêng liêng nhất. Chúng tôi trân quý từng hạt gạo từ cánh đồng phù sa màu mỡ, chọn lọc những giống lúa thuần chủng để mang đến sự an lòng tuyệt đối cho người nội trợ và hương vị đậm đà cho người thưởng thức.',
    // Đã bỏ chữ "Organic" khỏi khái niệm thương hiệu: không được dùng khi chưa
    // có chứng nhận hữu cơ (Nghị định 109/2018/NĐ-CP, TCVN 11041).
    concept: 'Bình An Ở Phía Đông (An tâm – An lành – An vui)'
  },
  vision: 'Trở thành thương hiệu gạo Việt được tin chọn trong mỗi gia đình, góp phần vun đắp những bữa cơm ngon, an lành và gắn kết qua nhiều thế hệ.',
  mission: 'Giúp mỗi người chăm lo cho người mình thương bằng những hạt gạo ngon, chất lượng đáng tin và những bữa cơm an lành mỗi ngày.',
  coreValues: [
    { title: 'Chân Thật', desc: 'Thông tin nguồn gốc, giống lúa và quy trình minh bạch, trung thực tuyệt đối.' },
    { title: 'Chu Đáo', desc: 'Chăm chút tỉ mỉ từ khâu chọn giống, canh tác đến bao bì trao tay người tiêu dùng.' },
    { title: 'Trách Nhiệm', desc: 'Đặt sức khỏe của người tiêu dùng và sự bền vững của nông dân làm trọng tâm.' },
    { title: 'Bền Bỉ', desc: 'Đồng hành kiên định cùng bữa cơm gia đình Việt qua năm tháng.' }
  ],
  contact: {
    address: manufacturer.address,
    addressEn: manufacturer.addressEn,
    phone: manufacturer.phone,
    email: manufacturer.email,
    taxCode: manufacturer.taxCode, // CẦN BỔ SUNG
    businessRegistrationNo: '',    // CẦN BỔ SUNG
    website: '',
    workingHours: ''
  }
};

// Không seed dữ liệu liên hệ. Trước đây có 2 bản ghi chứa họ tên, số điện thoại
// và email trông như dữ liệu cá nhân thật — không đưa vào cơ sở dữ liệu.
export const initialContacts = [];
