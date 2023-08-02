export const ROLE = {
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
};

export const USER_SIDEBAR = [
  { content: "Màn hình chính", route: "/user" },
  { content: "Thi online", route: "/user/exam" },
  { content: "Kết quả thi", route: "/user/review" }
];

export const ADMIN_SIDEBAR = [
  { content: "Màn hình chính", route: "/teacher" },
  {content : "Ngân hàng câu hỏi",route : "/teacher/testbank" },
  { content: "Quản lý đề thi", route: "/teacher/exam"},
  {content : "Quản lý lớp học", route : "/teacher/class"},
  { content: "Thống kê", route: "/teacher/statistics"}
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
  { value: "MATH", label: "Toán" },
  { value: "PHY", label: "Lý" },
  { value: "CHEM", label: "Hóa" },
  { value: "BIO", label: "Sinh" },
  { value: "ENG", label: "Anh"}
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