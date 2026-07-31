export const INITIAL_GRADES = [
  { id: 10, name: 'Khối 10' },
  { id: 11, name: 'Khối 11' },
  { id: 12, name: 'Khối 12' }
];

export const INITIAL_CLASSES = [
  // Khối 10
  { id: '10A1', grade: 10, name: 'Lớp 10A1', headTeacher: 'Cô Nguyễn Thị Hoa', room: 'Phòng 101', totalTarget: 40 },
  { id: '10A2', grade: 10, name: 'Lớp 10A2', headTeacher: 'Thầy Trần Văn Nam', room: 'Phòng 102', totalTarget: 38 },
  { id: '10A3', grade: 10, name: 'Lớp 10A3', headTeacher: 'Cô Lê Thị Mai', room: 'Phòng 103', totalTarget: 42 },

  // Khối 11
  { id: '11A1', grade: 11, name: 'Lớp 11A1', headTeacher: 'Thầy Phạm Quốc Bảo', room: 'Phòng 201', totalTarget: 40 },
  { id: '11A2', grade: 11, name: 'Lớp 11A2', headTeacher: 'Cô Đặng Thùy Dương', room: 'Phòng 202', totalTarget: 41 },

  // Khối 12
  { id: '12A1', grade: 12, name: 'Lớp 12A1', headTeacher: 'Cô Bùi Thanh Hương', room: 'Phòng 301', totalTarget: 40 },
  { id: '12A2', grade: 12, name: 'Lớp 12A2', headTeacher: 'Thầy Ngô Kiến Huy', room: 'Phòng 302', totalTarget: 39 }
];

// Preset Mock Behavior Catalog (Danh mục hành vi mẫu)
export const MOCK_GOOD_BEHAVIORS = [
  { title: 'Nhặt được của rơi trả lại người mất', points: 5, category: 'Đạo đức & Lối sống' },
  { title: 'Ban cán sự / Lớp trưởng gương mẫu hoàn thành tốt nhiệm vụ', points: 10, category: 'Nội quy & Trách nhiệm' },
  { title: 'Tích cực tham gia hoạt động Đoàn / Phong trào thi đua', points: 5, category: 'Phong trào Đoàn/Đội' },
  { title: 'Giúp đỡ bạn cùng tiến trong học tập', points: 5, category: 'Đoàn kết & Học tập' },
  { title: 'Vệ sinh lớp học sạch đẹp xuất sắc', points: 5, category: 'Vệ sinh & Tài sản' },
  { title: 'Đạt thành tích xuất sắc trong hội thao / văn nghệ trường', points: 10, category: 'Hoạt động Tập thể' }
];

export const MOCK_BAD_BEHAVIORS = [
  { title: 'Đi học muộn không có lý do chính đáng', points: -5, category: 'Chuyên cần' },
  { title: 'Quên đồng phục / Không đeo thẻ học sinh', points: -5, category: 'Nội quy' },
  { title: 'Không làm bài tập về nhà / Chưa chuẩn bị bài', points: -10, category: 'Thái độ Học tập' },
  { title: 'Sử dụng điện thoại trong giờ học khi chưa được cho phép', points: -10, category: 'Kỷ luật Giờ học' },
  { title: 'Mất trật tự, làm ảnh hưởng giờ học của lớp', points: -15, category: 'Kỷ luật Giờ học' },
  { title: 'Nghỉ học không phép', points: -20, category: 'Chuyên cần' }
];

// Helper to compute conduct classification based on current total points
export const calculateConductRating = (score) => {
  if (score >= 90) return 'Tốt';
  if (score >= 75) return 'Khá';
  if (score >= 50) return 'Đạt';
  return 'Chưa đạt';
};

// Initial student records with 100 base score & behavior transaction log
export const INITIAL_STUDENTS = [
  // --- 10A1 (DEFAULT CLASS) ---
  {
    id: 'HS1001',
    code: '202510001',
    name: 'Nguyễn Văn An',
    gender: 'Nam',
    dob: '2010-03-15',
    grade: 10,
    className: '10A1',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG1', date: '2025-10-05', type: 'BONUS', title: 'Ban cán sự lớp trưởng gương mẫu', points: 10, loggedBy: 'Cô Nguyễn Thị Hoa' },
      { id: 'LOG2', date: '2025-10-12', type: 'BONUS', title: 'Nhặt được của rơi trả lại người mất', points: 5, loggedBy: 'Cô Nguyễn Thị Hoa' }
    ],
    phone: '0912345671',
    email: 'an.nguyen@hocsinh.edu.vn',
    teacherComment: 'Học sinh cực kỳ gương mẫu, đạo đức xuất sắc, là chỗ dựa tin cậy của tập thể lớp 10A1.'
  },
  {
    id: 'HS1002',
    code: '202510002',
    name: 'Trần Thị Bình',
    gender: 'Nữ',
    dob: '2010-07-22',
    grade: 10,
    className: '10A1',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG3', date: '2025-10-08', type: 'BONUS', title: 'Tích cực tham gia hoạt động Đoàn / Phong trào thi đua', points: 5, loggedBy: 'Cô Nguyễn Thị Hoa' }
    ],
    phone: '0912345672',
    email: 'binh.tran@hocsinh.edu.vn',
    teacherComment: 'Năng nổ, nhiệt tình trong mọi hoạt động phong trào rèn luyện đạo đức của trường.'
  },
  {
    id: 'HS1003',
    code: '202510003',
    name: 'Lê Hoàng Cường',
    gender: 'Nam',
    dob: '2010-01-10',
    grade: 10,
    className: '10A1',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG4', date: '2025-10-02', type: 'BONUS', title: 'Đạt thành tích xuất sắc trong hội thao', points: 10, loggedBy: 'Cô Nguyễn Thị Hoa' },
      { id: 'LOG5', date: '2025-10-14', type: 'PENALTY', title: 'Đi học muộn không có lý do chính đáng', points: -5, loggedBy: 'Cô Nguyễn Thị Hoa' }
    ],
    phone: '0912345673',
    email: 'cuong.le@hocsinh.edu.vn',
    teacherComment: 'Có tinh thần tập thể cao, cần chú ý nâng cao tính chuyên cần đúng giờ.'
  },
  {
    id: 'HS1004',
    code: '202510004',
    name: 'Phạm Minh Dung',
    gender: 'Nữ',
    dob: '2010-09-05',
    grade: 10,
    className: '10A1',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG6', date: '2025-10-03', type: 'PENALTY', title: 'Đi học muộn không có lý do chính đáng', points: -5, loggedBy: 'Cô Nguyễn Thị Hoa' },
      { id: 'LOG7', date: '2025-10-11', type: 'PENALTY', title: 'Quên đồng phục / Không đeo thẻ học sinh', points: -5, loggedBy: 'Cô Nguyễn Thị Hoa' },
      { id: 'LOG8', date: '2025-10-18', type: 'PENALTY', title: 'Không làm bài tập về nhà / Chưa chuẩn bị bài', points: -10, loggedBy: 'Cô Nguyễn Thị Hoa' }
    ],
    phone: '0912345674',
    email: 'dung.pham@hocsinh.edu.vn',
    teacherComment: 'Ngoan ngoãn nhưng cần nghiêm túc hơn trong rèn luyện chuyên cần và chuẩn bị bài.'
  },
  {
    id: 'HS1005',
    code: '202510005',
    name: 'Hoàng Anh Dũng',
    gender: 'Nam',
    dob: '2010-11-18',
    grade: 10,
    className: '10A1',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG9', date: '2025-10-09', type: 'BONUS', title: 'Giúp đỡ bạn cùng tiến trong học tập', points: 5, loggedBy: 'Cô Nguyễn Thị Hoa' }
    ],
    phone: '0912345675',
    email: 'dung.hoang@hocsinh.edu.vn',
    teacherComment: 'Đạo đức rất tốt, khiêm tốn, hay giúp đỡ bạn bè.'
  },
  {
    id: 'HS1006',
    code: '202510006',
    name: 'Đỗ Tuấn Minh',
    gender: 'Nam',
    dob: '2010-02-28',
    grade: 10,
    className: '10A1',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG10', date: '2025-10-01', type: 'PENALTY', title: 'Nghỉ học không phép', points: -20, loggedBy: 'Cô Nguyễn Thị Hoa' },
      { id: 'LOG11', date: '2025-10-10', type: 'PENALTY', title: 'Mất trật tự, làm ảnh hưởng giờ học', points: -15, loggedBy: 'Cô Nguyễn Thị Hoa' },
      { id: 'LOG12', date: '2025-10-16', type: 'PENALTY', title: 'Sử dụng điện thoại trong giờ học', points: -10, loggedBy: 'Cô Nguyễn Thị Hoa' },
      { id: 'LOG13', date: '2025-10-20', type: 'PENALTY', title: 'Quên đồng phục / Không đeo thẻ', points: -5, loggedBy: 'Cô Nguyễn Thị Hoa' }
    ],
    phone: '0912345679',
    email: 'minh.do@hocsinh.edu.vn',
    teacherComment: 'Đã vi phạm nhiều lần kỷ luật chuyên cần. GVCN đã làm việc trực tiếp với phụ huynh để phối hợp rèn luyện.'
  },

  // --- 10A2 ---
  {
    id: 'HS1021',
    code: '202510021',
    name: 'Nguyễn Văn Phúc',
    gender: 'Nam',
    dob: '2010-04-10',
    grade: 10,
    className: '10A2',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG21', date: '2025-10-07', type: 'BONUS', title: 'Ban cán sự lớp trưởng gương mẫu', points: 10, loggedBy: 'Thầy Trần Văn Nam' }
    ],
    phone: '0912345681',
    email: 'phuc.nguyen@hocsinh.edu.vn',
    teacherComment: 'Lớp trưởng xuất sắc, kỷ luật tự giác cao.'
  },

  // --- 11A1 ---
  {
    id: 'HS1101',
    code: '202411001',
    name: 'Lê Minh Khôi',
    gender: 'Nam',
    dob: '2009-02-14',
    grade: 11,
    className: '11A1',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG31', date: '2025-10-10', type: 'BONUS', title: 'Nhặt được của rơi trả lại người mất', points: 5, loggedBy: 'Thầy Phạm Quốc Bảo' }
    ],
    phone: '0987654321',
    email: 'khoi.le@hocsinh.edu.vn',
    teacherComment: 'Trung thực, tư cách đạo đức học sinh xuất sắc.'
  },

  // --- 12A1 ---
  {
    id: 'HS1201',
    code: '202312001',
    name: 'Bùi Đức Anh',
    gender: 'Nam',
    dob: '2008-05-11',
    grade: 12,
    className: '12A1',
    baseScore: 100,
    behaviorLogs: [
      { id: 'LOG41', date: '2025-10-04', type: 'BONUS', title: 'Ban cán sự lớp trưởng gương mẫu', points: 10, loggedBy: 'Cô Bùi Thanh Hương' }
    ],
    phone: '0933112233',
    email: 'anh.bui@hocsinh.edu.vn',
    teacherComment: 'Bản lĩnh rèn luyện đạo đức xuất sắc, là tấm gương toàn trường.'
  }
];
