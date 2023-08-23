export const ROLE = {
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
};

export const STUDENT_SIDEBAR = [
  { content: "Màn hình chính", route: "/student" },
  { content: "Thi online", route: "/student/exam" },
  { content: "Kết quả thi", route: "/student/review" }
];

export const TEACHER_SIDEBAR = [
  { content: "Màn hình chính", route: "/teacher" },
  {content : "Ngân hàng câu hỏi",route : "/teacher/testbank" },
  { content: "Quản lý đề thi", route: "/teacher/exam"},
  {content : "Quản lý lớp học", route : "/teacher/class"},
  { content: "Thống kê", route: "/teacher/statistics"}
];

export const ADMIN_SIDEBAR = [
  { content: "Màn hình chính", route: "/admin" },
  {content : "Quản lý người dùng",route : "/admin/manage-user" },
  { content: "Quản lý câu hỏi", route: "/admin/testbank"},
];

export const getLabel = (enumArr, value) => {
  let found = enumArr.filter(e => e.value === value)[0];
  return found? found.label : "";
}

export const GRADE = [
  { value: "GRADE_1", label: "Khối 1" },
  { value: "GRADE_2", label: "Khối 2" },
  { value: "GRADE_3", label: "Khối 3" },
  { value: "GRADE_4", label: "Khối 4" },
  { value: "GRADE_5", label: "Khối 5" },
  { value: "GRADE_6", label: "Khối 6" },
  { value: "GRADE_7", label: "Khối 7" },
  { value: "GRADE_8", label: "Khối 8" },
  { value: "GRADE_9", label: "Khối 9" },
  { value: "GRADE_10", label: "Khối 10" },
  { value: "GRADE_11", label: "Khối 11" },
  { value: "GRADE_12", label: "Khối 12" }
];


export const SUBJECT = [
  { value: "CONG_NGHE", label: "Công nghệ" },
  { value: "DIA_LY", label: "Địa lý" },
  { value: "DAO_DUC", label: "Đạo đức" },
  { value: "GDKTPL", label: "Giáo dục Kinh tế và Pháp luật" },
  { value: "GDQPAN", label: "Giáo dục Quốc phòng và An ninh" },
  { value: "GDTC", label: "Giáo dục Thể chất"},
  { value: "HOA_HOC", label: "Hóa học"},
  { value: "KHTN", label: "Khoa học tự nhiên"},
  { value: "LSDL", label: "Lịch sử và Địa lý"},
  { value: "LICH_SU", label: "Lịch sử"},
  { value: "NGHE_THUAT", label: "Nghệ thuật"},
  { value: "TIENG_ANH", label: "Tiếng Anh"},
  { value: "NGU_VAN", label: "Ngữ Văn"},
  { value: "SINH_HOC", label: "Sinh học"},
  { value: "TIN_HOC", label: "Tin học"},
  { value: "TOAN", label: "Toán"},
  { value: "TIENG_VIET", label: "Tiếng Việt"},
  { value: "VAT_LY", label: "Vật lý"},
  { value: "KHAC", label: "Khác"},
];

export const QUESTION_TYPE = [
  {value: "SINGLE_CHOICE", label: "Một lựa chọn"},
  {value: "MULTIPLE_CHOICE", label: "Nhiều lựa chọn"},
]

export const EXAM_STATUS = [
  {value: "PUBLISHED", label: "Đã xuất bản"},
  {value: "UNPUBLISHED", label: "Chưa xuất bản"},
]

export const QUESTION_LEVEL = [
  {value: "LEVEL_1", label: "Nhận biết"},
  {value: "LEVEL_2", label: "Thông hiểu"},
  {value: "LEVEL_3", label: "Vận dụng"},
  {value: "LEVEL_4", label: "Vận dụng cao"},
]

export const ANSWER_KEY = [
  {value: "A", label: "A"},
  {value: "B", label: "B"},
  {value: "C", label: "C"},
  {value: "D", label: "D"},
]

export const USER_ACTIVE = [
  {value: true, label: "Hoạt động"},
  {value: false, label: "Không hoạt động"},
]

export const QUESTION_STATUS = [
  {value: 'PENDING', label: "Chưa duyệt"},
  {value: 'REJECTED', label: "Từ chối"},
  {value: 'APPROVED', label: "Đã duyệt"},
  {value: 'ARCHIVED', label: "Lưu trữ"},
]

export const USER_ROLE = [
  {value: 'STUDENT', label: "Học sinh"},
  {value: 'TEACHER', label: "Giáo viên"},
  {value: 'ADMIN', label: "Quản trị viên"},
]


const findIndexByValue = (arr, value) => {
  return arr.findIndex(item => item.value === value);
}

export const compareEnum = (enumArr, value1, value2) => {
  return findIndexByValue(enumArr,value1) - findIndexByValue(enumArr,value2)
}

export const createFilterFromEnum = (enumArr) => {
  return enumArr.map(e => ({
    value: e.value,
    text: e.label
  }))
}

export const getValue = (enumArr, label) => {
  let found = enumArr.filter(e => e.label === label)[0];
  return found? found.value : "";
}

export const getLabels = (enumArr) => {
  return enumArr.map(e => ({'Gia_tri_hop_le': e.label}))
}