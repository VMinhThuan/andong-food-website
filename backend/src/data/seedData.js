import bcrypt from 'bcryptjs';

// Pre-hashed passwords for default accounts:
// 'admin123' and 'staff123'
const adminPasswordHash = bcrypt.hashSync('admin123', 10);
const staffPasswordHash = bcrypt.hashSync('staff123', 10);

export const initialUsers = [
  {
    id: 'usr_admin_01',
    username: 'admin',
    email: 'admin@andongfood.vn',
    password: adminPasswordHash,
    fullName: 'Quản Trị Viên An Đông',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr_staff_01',
    username: 'nhanvien',
    email: 'nhanvien@andongfood.vn',
    password: staffPasswordHash,
    fullName: 'Nguyễn Văn An (Nhân Viên CSKH)',
    role: 'staff',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  }
];

export const initialCategories = [
  {
    id: 'cat_dac_san',
    name: 'Gạo Đặc Sản Thượng Hạng',
    slug: 'gao-dac-san-thuong-hang',
    description: 'Các giống gạo đặc sản trứ danh của Việt Nam đạt chuẩn chất lượng cao nhất',
    order: 1
  },
  {
    id: 'cat_dinh_duong',
    name: 'Gạo Dinh Dưỡng & Thực Dưỡng',
    slug: 'gao-dinh-duong-thuc-duong',
    description: 'Gạo lứt, gạo mầm giàu chất xơ và khoáng chất cho lối sống lành mạnh',
    order: 2
  },
  {
    id: 'cat_gia_dinh',
    name: 'Gạo Bữa Cơm Gia Đình',
    slug: 'gao-bua-com-gia-dinh',
    description: 'Gạo dẻo thơm mềm cơm, phù hợp với khẩu vị hàng ngày của mọi gia đình',
    order: 3
  }
];

export const initialCompany = {
  name: 'CÔNG TY TNHH THỰC PHẨM AN ĐÔNG (AN ĐÔNG FOOD)',
  shortName: 'AN ĐÔNG FOOD',
  slogan: 'Bình An Ở Phía Đông – Gạo Ngon Chuẩn Giống, Gửi Trọn An Lòng',
  brandStory: {
    title: 'Câu Chuyện Thương Hiệu An Đông',
    meaning: '“Đông” đại diện cho sự bền bỉ để đi qua những mùa khó khăn, còn “An” là sự bình an muốn dành cho người mình thương.',
    content: 'An Đông ra đời từ niềm tin rằng mỗi bữa cơm gia đình là sợi dây gắn kết thiêng liêng nhất. Chúng tôi trân quý từng hạt gạo từ cánh đồng phù sa màu mỡ, chọn lọc những giống lúa thuần chủng để mang đến sự an lòng tuyệt đối cho người nội trợ và hương vị đậm đà cho người thưởng thức. Dù ở gần hay xa, người ăn ngon miệng – người lựa chọn cũng an lòng.',
    concept: 'Bình An Ở Phía Đông (An tâm – Organic – Lý tưởng)'
  },
  vision: 'Trở thành thương hiệu gạo Việt được tin chọn trong mỗi gia đình, góp phần vun đắp những bữa cơm ngon, an lành và gắn kết qua nhiều thế hệ.',
  mission: 'Giúp mỗi người chăm lo cho người mình thương bằng những hạt gạo ngon, chất lượng đáng tin và những bữa cơm an lành mỗi ngày.',
  brandPromise: [
    'Hạt gạo thơm ngon tự nhiên',
    'Chất lượng đáng tin cậy 100% chuẩn giống',
    'Người ăn ngon miệng trọn vị',
    'Người lựa chọn luôn an lòng'
  ],
  coreValues: [
    {
      title: 'Chân Thật',
      desc: 'Thông tin nguồn gốc, giống lúa và quy trình minh bạch, trung thực tuyệt đối.'
    },
    {
      title: 'Chu Đáo',
      desc: 'Chăm chút tỉ mỉ từ khâu chọn giống, canh tác đến bao bì trao tay người tiêu dùng.'
    },
    {
      title: 'Trách Nhiệm',
      desc: 'Đặt sức khỏe của người tiêu dùng và sự bền vững của nông dân làm trọng tâm.'
    },
    {
      title: 'Bền Bỉ',
      desc: 'Đồng hành kiên định cùng bữa cơm gia đình Việt qua năm tháng.'
    }
  ],
  contact: {
    address: 'Số 88 Đường Phù Sa, Phường An Đông, TP. Hồ Chí Minh & Chi nhánh Đồng Tháp Mười',
    hotline: '1900 886 688 - 0988 123 456',
    email: 'lienhe@andongfood.vn',
    website: 'https://andongfood.vn',
    zalo: '0988 123 456 (Zalo OA An Đông Food)',
    facebook: 'https://facebook.com/andongfood.vietnam',
    workingHours: '08:00 - 18:00 (Thứ Hai - Thứ Bảy)'
  }
};

export const initialProducts = [
  {
    id: 'prod_st25_01',
    code: 'AD-ST25-01',
    name: 'Gạo ST25 An Đông Thượng Hạng',
    slug: 'gao-st25-an-dong-thuong-hang',
    categoryId: 'cat_dac_san',
    categoryName: 'Gạo Đặc Sản Thượng Hạng',
    tagline: 'Gạo Ngon Chuẩn Giống – Gửi Trọn An Lòng (100% Chuẩn Giống ST25)',
    summary: 'Gạo đạt giải Gạo ngon nhất thế giới, hạt thon dài trắng trong, cơm dẻo mềm mùi lá dứa tự nhiên, đậm vị ngọt hậu.',
    price: 36000,
    unit: 'kg',
    packSizes: ['2kg', '5kg', '10kg (Túi hút chân không)'],
    packaging: 'Bao bì cao cấp tráng màng bảo vệ, van thông khí 1 chiều hoặc hút chân không',
    expiry: '12 tháng kể từ ngày sản xuất',
    origin: {
      location: 'Vùng luân canh Tôm - Lúa hữu cơ Sóc Trăng / Bạc Liêu',
      soil: 'Đất phù sa bãi bồi ven biển giàu khoáng chất tự nhiên',
      farmerCoop: 'Hợp tác xã Nông nghiệp Bền vững An Đông - Mekong',
      harvestSeason: 'Vụ Đông Xuân trĩu hạt'
    },
    specs: {
      variety: 'Lúa thuần ST25 chính dòng kỹ sư Hồ Quang Cua',
      purity: '99.5% độ thuần giống',
      moisture: '<= 14%',
      brokenRate: '<= 5% tấm',
      preservatives: '0% chất bảo quản, 0% hương liệu nhân tạo, 0% chất tẩy trắng'
    },
    tasteProfile: {
      aroma: 'Thơm ngát hương lá dứa hòa quyện mùi cốm non tự nhiên',
      texture: 'Dẻo mềm, hạt cơm kết dính vừa phải, nguyên hạt không nát',
      taste: 'Vị ngọt hậu sâu, bùi đậm đà, để nguội qua đêm vẫn mềm ngon'
    },
    processSteps: [
      {
        step: 1,
        title: 'Chọn Giống & Canh Tác Sạch',
        desc: 'Sử dụng 100% hạt giống thuần chủng ST25 trên vùng đất lúa - tôm hữu cơ không tồn dư hóa chất.'
      },
      {
        step: 2,
        title: 'Thu Hoạch Đúng Độ Chín Vàng',
        desc: 'Gặt lúa khi hạt chín đều 85-90% để giữ trọn vẹn lớp cám thơm và hàm lượng dưỡng chất cao nhất.'
      },
      {
        step: 3,
        title: 'Sấy Nhiệt Chậm & Tách Vỏ',
        desc: 'Công nghệ sấy tầng sôi nhiệt độ thấp giúp hạt lúa giữ ẩm tự nhiên và không bị nứt gãy.'
      },
      {
        step: 4,
        title: 'Bắn Màu & Kiểm Tra Quang Học',
        desc: 'Hệ thống máy tách màu quang học AI loại bỏ 100% hạt khiếm khuyết, sâu đục và tạp chất.'
      },
      {
        step: 5,
        title: 'Đóng Gói Khí Trơ / Chân Không',
        desc: 'Đóng gói chuẩn vi sinh tiệt trùng, dán mã QR truy xuất nguồn gốc từng lô sản phẩm trước khi xuất xưởng.'
      }
    ],
    cookingGuide: {
      waterRatio: '1 chén gạo : 1 đến 1.1 chén nước (Không cần cho quá nhiều nước)',
      washingTips: 'Vo nhẹ tay 1 - 2 lần để giữ lớp dưỡng chất cám mỏng bên ngoài',
      cookingTips: 'Nấu bằng chế độ cơm thường. Khi cơm chín, để ủ thêm 10-15 phút trước khi xới đều để hạt cơm săn dẻo.'
    },
    storageGuide: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Sau khi mở túi nên đậy kín trong thùng gạo chuyên dụng hoặc bảo quản ngăn mát tủ lạnh.',
    certifications: [
      { name: 'VietGAP', code: 'VIETGAP-TR-2025-889', authority: 'Trung tâm Chứng nhận Nông nghiệp Sạch' },
      { name: 'HACCP Codex 2020', code: 'HACCP-VN-9921', authority: 'Tổ chức Giám định Quốc tế' },
      { name: 'ISO 22000:2018', code: 'ISO-FOOD-2026', authority: 'Hệ thống Quản lý ATTP' }
    ],
    images: {
      main: '/assets/product-gao.png',
      banner: '/assets/banner-gao-3.png',
      field: '/assets/banner-gao-2.png',
      detail: '/assets/banner-gao.png'
    },
    qrCodeString: 'https://andongfood.vn/san-pham/gao-st25-an-dong-thuong-hang',
    isFeatured: true,
    inStock: true
  },
  {
    id: 'prod_nang_thom_02',
    code: 'AD-NT-02',
    name: 'Gạo Nàng Thơm Chợ Đào An Đông',
    slug: 'gao-nang-thom-cho-dao-an-dong',
    categoryId: 'cat_dac_san',
    categoryName: 'Gạo Đặc Sản Thượng Hạng',
    tagline: 'Hương Thơm Quý Tộc Vùng Đất Chợ Đào – Đậm Đà Bữa Cơm Việt',
    summary: 'Giống gạo tiến vua trứ danh, hạt thon nhỏ lấp lánh hạt lựu ửng hồng, khi nấu tỏa hương ngào ngạt thơm lừng gian bếp.',
    price: 32000,
    unit: 'kg',
    packSizes: ['2kg', '5kg', '10kg'],
    packaging: 'Túi màng nhôm phức hợp cao cấp giữ hương tuyệt đối',
    expiry: '12 tháng kể từ ngày sản xuất',
    origin: {
      location: 'Cánh đồng phù sa Chợ Đào - Cần Đước - Long An',
      soil: 'Thổ nhưỡng đất pha sét màu mỡ bên dòng sông Vàm Cỏ',
      farmerCoop: 'HTX Nàng Thơm Chợ Đào Truyền Thống',
      harvestSeason: 'Vụ mùa Đông Xuân chính gốc'
    },
    specs: {
      variety: 'Nàng Thơm Chợ Đào chuẩn gen bản địa',
      purity: '99%',
      moisture: '<= 14.5%',
      brokenRate: '<= 5% tấm',
      preservatives: 'Không chất bảo quản, không hương liệu'
    },
    tasteProfile: {
      aroma: 'Mùi thơm nồng nàn đặc trưng lan tỏa ngay từ khi bắt đầu sôi nước',
      texture: 'Hạt cơm bóng mượt, mềm mịn và xốp dẻo vừa phải',
      taste: 'Hương vị ngọt thanh, béo nhẹ của giống gạo hoàng gia xưa'
    },
    processSteps: [
      { step: 1, title: 'Bảo Tồn Nguồn Gen', desc: 'Chọn giống chuẩn Nàng Thơm từ viện di truyền lúa giống miền Tây.' },
      { step: 2, title: 'Canh Tác Truyền Thống', desc: 'Canh tác sinh học hạn chế phân vô cơ để giữ trọn vẹn lớp dầu thơm.' },
      { step: 3, title: 'Sấy Khí Tự Nhiên', desc: 'Sấy nhẹ ở nhiệt độ kiểm soát tránh bay hơi các hợp chất thơm dễ bay hơi.' },
      { step: 4, title: 'Tách Trấu Siêu Âm', desc: 'Xay xát nhẹ nhàng, giữ lại vi chất dinh dưỡng và lớp cám mỏng.' },
      { step: 5, title: 'Đóng Bao Giữ Hương', desc: 'Quy trình đóng gói màng kín 3 lớp chống ẩm và khóa hương thơm.' }
    ],
    cookingGuide: {
      waterRatio: '1 chén gạo : 1.15 đến 1.2 chén nước',
      washingTips: 'Vo nhẹ tay 1 lần với nước mát',
      cookingTips: 'Cơm chín nên xới nhẹ để hạt cơm tơi đều và tỏa trọn vẹn mùi thơm nồng nàn.'
    },
    storageGuide: 'Đựng trong bình thủy tinh hoặc thùng gạo kín gió, để nơi khô mát.',
    certifications: [
      { name: 'VietGAP', code: 'VIETGAP-LA-2025-442', authority: 'Chi cục Trồng trọt & BVTV' },
      { name: 'Chuỗi Thực Phẩm An Toàn', code: 'CFS-VN-2026', authority: 'Ban Quản lý ATTP' }
    ],
    images: {
      main: '/assets/product-gao.png',
      banner: '/assets/banner-gao-2.png',
      field: '/assets/banner-gao.png',
      detail: '/assets/banner-gao-3.png'
    },
    qrCodeString: 'https://andongfood.vn/san-pham/gao-nang-thom-cho-dao-an-dong',
    isFeatured: true,
    inStock: true
  },
  {
    id: 'prod_gao_lut_03',
    code: 'AD-GL-03',
    name: 'Gạo Lứt Huyết Rồng Dinh Dưỡng An Đông',
    slug: 'gao-lut-huyet-rong-dinh-duong-an-dong',
    categoryId: 'cat_dinh_duong',
    categoryName: 'Gạo Dinh Dưỡng & Thực Dưỡng',
    tagline: 'Bảo Vệ Sức Khỏe – Cân Bằng Năng Lượng Cho Cuộc Sống Hiện Đại',
    summary: 'Giàu anthocyanin, chất xơ, vitamin nhóm B và khoáng chất, hỗ trợ tim mạch, giữ dáng và kiểm soát đường huyết hiệu quả.',
    price: 38000,
    unit: 'kg',
    packSizes: ['1kg', '2kg', '5kg (Hút chân không)'],
    packaging: 'Gói hút chân không định hình giữ nguyên vẹn dầu cám tự nhiên',
    expiry: '12 tháng',
    origin: {
      location: 'Cánh đồng sinh thái Đồng Tháp Mười',
      soil: 'Đất phèn giàu khoáng vi lượng tự nhiên',
      farmerCoop: 'Liên minh Nông nghiệp Hữu cơ An Đông',
      harvestSeason: 'Vụ mùa tự nhiên 6 tháng'
    },
    specs: {
      variety: 'Lúa Huyết Rồng vỏ đỏ ruột đỏ',
      purity: '99%',
      moisture: '<= 13.5%',
      brokenRate: '<= 3%',
      preservatives: '100% nguyên cám tự nhiên'
    },
    tasteProfile: {
      aroma: 'Thơm bùi ngậy như hạt ngũ cốc nướng',
      texture: 'Giòn sần sật bùi ngậy, càng nhai kỹ càng ngọt đậm đà',
      taste: 'Vị ngọt thanh tự nhiên của lớp cám giàu dưỡng chất'
    },
    processSteps: [
      { step: 1, title: 'Thu Hoạch Lúa Đỏ Hữu Cơ', desc: 'Chọn từng bông lúa chín đỏ đều không sâu bệnh.' },
      { step: 2, title: 'Sấy Gián Tiếp', desc: 'Giữ nhiệt độ dưới 40 độ C để không làm biến tính các vitamin nhạy cảm.' },
      { step: 3, title: 'Tách Trấu Không Đánh Bóng', desc: 'Chỉ bóc lớp vỏ trấu cứng, bảo toàn 100% lớp cám đỏ quý giá.' },
      { step: 4, title: 'Khử Trùng Tia UV', desc: 'Khử khuẩn tự nhiên bằng công nghệ chiếu xạ an toàn chuẩn thực phẩm.' },
      { step: 5, title: 'Hút Chân Không Định Hình', desc: 'Ngăn oxy hóa dầu cám, giữ độ tươi ngon kéo dài.' }
    ],
    cookingGuide: {
      waterRatio: '1 chén gạo : 1.5 đến 1.8 chén nước',
      washingTips: 'Ngâm gạo trước 45 - 60 phút trong nước ấm để hạt gạo nở mềm xốp',
      cookingTips: 'Nấu bằng nồi cơm điện ở chế độ Brown Rice (Gạo Lứt) hoặc nấu lâu hơn cơm trắng 15 phút.'
    },
    storageGuide: 'Sau khi cắt miệng bao, bảo quản trong ngăn mát tủ lạnh để giữ lớp dầu cám không bị oxy hóa.',
    certifications: [
      { name: 'Organic VietGAP', code: 'ORG-VN-2025-081', authority: 'Trung tâm Giám định Hữu cơ' },
      { name: 'ISO 22000:2018', code: 'ISO-22K-8812', authority: 'Tổ chức Chứng nhận Tiêu chuẩn' }
    ],
    images: {
      main: '/assets/product-gao.png',
      banner: '/assets/banner-gao.png',
      field: '/assets/banner-gao-3.png',
      detail: '/assets/banner-gao-2.png'
    },
    qrCodeString: 'https://andongfood.vn/san-pham/gao-lut-huyet-rong-dinh-duong-an-dong',
    isFeatured: true,
    inStock: true
  },
  {
    id: 'prod_thom_lai_04',
    code: 'AD-TL-04',
    name: 'Gạo Thơm Lài Sữa An Đông',
    slug: 'gao-thom-lai-sua-an-dong',
    categoryId: 'cat_gia_dinh',
    categoryName: 'Gạo Bữa Cơm Gia Đình',
    tagline: 'Dẻo Mềm Ngọt Vị – Chu Đáo Trong Từng Bữa Cơm Gia Đình',
    summary: 'Hạt gạo đục sữa óng ánh, cơm dẻo nhiều, mềm ngọt tự nhiên, rất thích hợp cho gia đình có người lớn tuổi và trẻ nhỏ.',
    price: 24000,
    unit: 'kg',
    packSizes: ['5kg', '10kg', '25kg'],
    packaging: 'Bao dệt PP tráng ghép màng BOPP cao cấp',
    expiry: '12 tháng',
    origin: {
      location: 'Vựa lúa An Giang & Kiên Giang',
      soil: 'Phù sa ngọt của dòng sông Tiền và sông Hậu bồi đắp hàng năm',
      farmerCoop: 'Hợp tác xã Nông Nghiệp Xanh An Đông',
      harvestSeason: 'Thu hoạch luân vụ 3 vụ/năm'
    },
    specs: {
      variety: 'Giống lúa Thơm Lài sữa thuần nông',
      purity: '98%',
      moisture: '<= 14%',
      brokenRate: '<= 8%',
      preservatives: 'Cam kết không chất tạo mùi, không chất tẩy trắng'
    },
    tasteProfile: {
      aroma: 'Thơm dịu nhẹ hương hoa lài sữa tự nhiên',
      texture: 'Dẻo nhiều, dính cơm, mềm xốp và giữ độ ẩm tốt',
      taste: 'Ngọt béo đậm đà, dễ ăn cho mọi thành viên'
    },
    processSteps: [
      { step: 1, title: 'Thu Mua Tại Cánh Đồng', desc: 'Kiểm tra độ ẩm và tỉ lệ hạt sữa ngay tại ruộng trước khi thu mua.' },
      { step: 2, title: 'Làm Sạch Tạp Chất', desc: 'Sàng lọc rơm rác, sạn đá qua hệ thống 3 cấp lọc.' },
      { step: 3, title: 'Sấy Khô Kiểm Soát', desc: 'Đưa ẩm độ về mức tối ưu 13.8% để bảo quản tốt nhất.' },
      { step: 4, title: 'Xát Trắng & Tách Tấm', desc: 'Đánh bóng bằng nước mát tự nhiên tạo màu trắng sữa.' },
      { step: 5, title: 'Đóng Bao Xuất Xưởng', desc: 'Cân định lượng tự động sai số dưới 0.1%.' }
    ],
    cookingGuide: {
      waterRatio: '1 chén gạo : 1 đến 1.1 chén nước',
      washingTips: 'Vo nhẹ 1 lần với nước sạch',
      cookingTips: 'Không cần ngâm, nấu trực tiếp và giữ nóng sau khi cơm chín 10 phút.'
    },
    storageGuide: 'Để nơi khô ráo, tránh ẩm ướt và côn trùng xâm nhập.',
    certifications: [
      { name: 'VietGAP', code: 'VIETGAP-AG-2025-119', authority: 'Sở NN&PTNT An Giang' },
      { name: 'VSATTP', code: 'ATTP-HCM-3342', authority: 'Chi cục Quản lý Chất lượng' }
    ],
    images: {
      main: '/assets/product-gao.png',
      banner: '/assets/banner-gao-2.png',
      field: '/assets/banner-gao.png',
      detail: '/assets/banner-gao-3.png'
    },
    qrCodeString: 'https://andongfood.vn/san-pham/gao-thom-lai-sua-an-dong',
    isFeatured: false,
    inStock: true
  }
];

export const initialContacts = [
  {
    id: 'msg_001',
    fullName: 'Trần Thị Mai Hương',
    phone: '0903 456 789',
    email: 'maihuong.tran@gmail.com',
    company: 'Chuỗi Nhà Hàng Cơm Quê Mẹ Nấu',
    subject: 'Tư vấn hợp tác nguồn cung cấp Gạo ST25 số lượng lớn định kỳ',
    message: 'Chào An Đông Food, chúng tôi đang tìm kiếm nhà cung cấp gạo ST25 chuẩn giống để sử dụng cho chuỗi 5 nhà hàng tại TP.HCM. Mỗi tháng tiêu thụ khoảng 2-3 tấn. Xin vui lòng gửi bảng báo giá đại lý và chính sách giao hàng.',
    status: 'processing',
    assignedTo: 'nhanvien',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString()
  },
  {
    id: 'msg_002',
    fullName: 'Lê Hoàng Nam',
    phone: '0977 889 900',
    email: 'namle.hoang@outlook.com',
    company: 'Cá nhân',
    subject: 'Hỏi về cách quét mã QR trên bao bì để kiểm tra hạn sử dụng',
    message: 'Tôi vừa mua bao 5kg gạo ST25 của An Đông tại siêu thị, thấy có mã QR in trên bao bì. Tôi đã quét và thấy website hiển thị thông tin rất chi tiết, rất an tâm. Cho tôi hỏi công ty có bán dòng gạo lứt hút chân không 1kg không để tôi mua kèm.',
    status: 'completed',
    assignedTo: 'nhanvien',
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString()
  }
];
