const cookingInstructions = [
  { step: 1, viTitle: 'VO GẠO', vi: 'Đong gạo vào nồi. Vo gạo bằng nước sạch.', enTitle: 'RINSE THE RICE', en: 'Measure the rice into the pot. Rinse with clean water.' },
  { step: 2, viTitle: 'THÊM NƯỚC', vi: 'Cho nước vào nồi với tỷ lệ nước và gạo là 1:1.', enTitle: 'ADD WATER', en: 'Add water at a 1:1 water-to-rice ratio.' },
  { step: 3, viTitle: 'NẤU CƠM', vi: 'Khi nấu cơm, không mở nắp cho đến khi cơm chín.', enTitle: 'COOK', en: 'Keep the lid closed until the rice is fully cooked.' },
  { step: 4, viTitle: 'THƯỞNG THỨC', vi: 'Cơm chín, để cơm nghỉ khoảng 5 phút rồi xới đều trước khi dùng.', enTitle: 'SERVE', en: 'Once cooked, let the rice rest for about 5 minutes, then fluff well before serving.' }
];

const nutrition = [
  ['Năng lượng / Calories', '320–400 kcal'],
  ['Đạm / Total Protein', '6–8%'],
  ['Chất béo / Total Fat', '0,5–0,8%'],
  ['Carbohydrate', '75–85%']
];

const manufacturer = [
  'CÔNG TY TNHH AN ĐÔNG FOOD',
  'Ấp Long Thành, xã Phước Long, tỉnh Cà Mau.',
  'Long Thanh Hamlet, Phuoc Long Commune, Ca Mau Province.',
  'Email: andongfood@gmail.com',
  'Điện thoại / Phone: 0944 852 464'
];

const sharedOfficialFields = {
  expiry: '12 tháng kể từ ngày sản xuất.',
  expiryEn: '12 months from the date of manufacture.',
  storageGuide: 'Bảo quản nơi khô ráo, thoáng mát và tránh ánh nắng trực tiếp.',
  storageGuideEn: 'Store in a cool, dry place away from direct sunlight.',
  notice: 'Không sử dụng sản phẩm đã hết hạn hoặc có dấu hiệu ẩm mốc.',
  noticeEn: 'Do not consume if expired or if there are any signs of mold.',
  originCountry: 'Việt Nam', originCountryEn: 'Made in Vietnam', barcode: '0 651294 378024 3',
  nutrition: { basis: '100 g', energy: '320–400 kcal', protein: '6–8%', fat: '0,5–0,8%', carbohydrate: '75–85%' },
  cookingSteps: cookingInstructions,
  manufacturer: { name: 'CÔNG TY TNHH AN ĐÔNG FOOD', address: 'Ấp Long Thành, xã Phước Long, tỉnh Cà Mau.', addressEn: 'Long Thanh Hamlet, Phuoc Long Commune, Ca Mau Province.', email: 'andongfood@gmail.com', phone: '0944 852 464' }
};

function content(number, englishName, introductionVi, introductionEn, ingredient) {
  return {
    number,
    englishName,
    introduction: { vi: introductionVi, en: introductionEn },
    cookingInstructions,
    nutrition,
    information: [
      ['THÀNH PHẦN / INGREDIENTS', ingredient],
      ['HẠN SỬ DỤNG / EXPIRY DATE', '12 tháng kể từ ngày sản xuất.\n12 months from the date of manufacture.'],
      ['SỐ CB / DECLARATION NO.', '01/ANDONG-ST25/2026'],
      ['BẢO QUẢN / STORAGE', 'Bảo quản nơi khô ráo, thoáng mát và tránh ánh nắng trực tiếp.\nStore in a cool, dry place away from direct sunlight.'],
      ['CẢNH BÁO / NOTICE', 'Không sử dụng sản phẩm đã hết hạn hoặc có dấu hiệu ẩm mốc.\nDo not consume if expired or if there are any signs of mold.'],
      ['NSX / PRODUCTION DATE', '________________________________'],
      ['XUẤT XỨ / ORIGIN', 'Việt Nam / Made in Vietnam'],
      ['MÃ VẠCH / BARCODE', '0 651294 378024 3']
    ],
    manufacturer
  };
}

export const officialProducts = [
  {
    id: 'prod_st25_01', code: 'AD-ST25-01', name: 'GẠO ST25', slug: 'gao-st25-an-dong-thuong-hang',
    ...sharedOfficialFields,
    summary: 'Gạo ST25 thuần được gieo trồng trên vùng đất màu mỡ, mang phẩm chất của giống gạo Việt từng được vinh danh “Gạo ngon nhất thế giới” năm 2023 tại Cebu, Philippines. Hạt thon dài, thơm tự nhiên, cho cơm dẻo mềm và vị ngọt thanh.',
    nameEn: 'ST25 RICE', summaryEn: 'Grown in fertile lands, pure ST25 rice carries the qualities of the Vietnamese variety recognized as “World’s Best Rice” in 2023 in Cebu, Philippines. Its long, slender grains are naturally aromatic, cooking into soft, tender rice with a delicate sweetness.',
    ingredients: '100% gạo trắng thuần ST25.', ingredientsEn: '100% Pure ST25 White Rice.', declarationNo: '01/ANDONG-ST25/2026',
    images: { main: '/assets/product-gao.png', front: '/assets/brand-element/MẶT TRƯỚC BAO BÌ.png', back: '/assets/brand-element/MẶT SAU BAO BÌ.png' }, qrCodeString: 'https://andofood.vn/san-pham/gao-st25-an-dong-thuong-hang', isFeatured: true, inStock: true,
    content: content('SẢN PHẨM 01  /  PRODUCT 01', 'ST25 RICE', 'Gạo ST25 thuần được gieo trồng trên vùng đất màu mỡ, mang phẩm chất của giống gạo Việt từng được vinh danh “Gạo ngon nhất thế giới” năm 2023 tại Cebu, Philippines. Hạt thon dài, thơm tự nhiên, cho cơm dẻo mềm và vị ngọt thanh.', 'Grown in fertile lands, pure ST25 rice carries the qualities of the Vietnamese variety recognized as “World’s Best Rice” in 2023 in Cebu, Philippines. Its long, slender grains are naturally aromatic, cooking into soft, tender rice with a delicate sweetness.', '100% gạo trắng thuần ST25.\n100% Pure ST25 White Rice.')
  },
  {
    id: 'prod_vuong_tom_02', code: 'AD-VT-02', name: 'GẠO VUÔNG TÔM', slug: 'gao-vuong-tom-an-dong',
    ...sharedOfficialFields,
    summary: 'Gạo Vuông Tôm được gieo trồng theo mô hình luân canh lúa – tôm, thuận theo nhịp nước mặn – ngọt tự nhiên của miền Tây. Hạt gạo mang hương thơm dịu, cơm dẻo mềm và vị ngọt thanh đặc trưng – kết tinh từ sự hài hòa giữa đất, nước và mùa vụ.',
    nameEn: 'RICE-SHRIMP RICE', summaryEn: 'Rice–Shrimp Rice is grown through a traditional rice–shrimp rotation, following the natural rhythm of fresh and brackish water in the Mekong Delta. This unique ecosystem produces naturally aromatic grains with a soft, tender texture and delicate sweetness.',
    ingredients: '100% gạo trắng Vuông Tôm.', ingredientsEn: '100% Pure Rice–Shrimp Rice.', declarationNo: '01/ANDONG-ST25/2026',
    images: { main: '/assets/product-gao.png', front: '/assets/brand-element/MẶT TRƯỚC BAO BÌ.png', back: '/assets/brand-element/MẶT SAU BAO BÌ.png' }, qrCodeString: 'https://andofood.vn/san-pham/gao-vuong-tom-an-dong', isFeatured: true, inStock: true,
    content: content('SẢN PHẨM 02  /  PRODUCT 02', 'RICE-SHRIMP RICE', 'Gạo Vuông Tôm được gieo trồng theo mô hình luân canh lúa – tôm, thuận theo nhịp nước mặn – ngọt tự nhiên của miền Tây. Hạt gạo mang hương thơm dịu, cơm dẻo mềm và vị ngọt thanh đặc trưng – kết tinh từ sự hài hòa giữa đất, nước và mùa vụ.', 'Rice–Shrimp Rice is grown through a traditional rice–shrimp rotation, following the natural rhythm of fresh and brackish water in the Mekong Delta. This unique ecosystem produces naturally aromatic grains with a soft, tender texture and delicate sweetness.', '100% gạo trắng Vuông Tôm.\n100% Pure Rice–Shrimp Rice.')
  }
];
