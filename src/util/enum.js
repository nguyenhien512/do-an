export const ROLE = {
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
};

export const USER_SIDEBAR = [
  { content: "Dashboard", route: "/user" },
  { content: "Exam", route: "/user/exam" }
];

export const ADMIN_SIDEBAR = [
  { content: "Dashboard", route: "/teacher" },
  { content: "Exam", route: "/teacher/exam"},
  {content :"Class",route : "/teacher/class" },
  { content: "Thống kê", route: "/teacher/statistics"}
  // {content :"Manage Asset",route : "/asset" },
  // {content : "Manage Assignment",route: "/assignment"},
  // {content : "Request for Returning",route: "/RequestForReturning"},
  // {content : "Report",route: "/report"}

];

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

export const getGradeLabel = (value) => {
  let grade = GRADE.filter(e => e.value === value)[0];
  return grade.label;
}

export const SUBJECT = [
  { value: "MATH", label: "Môn Toán" },
  { value: "PHY", label: "Môn Lý" },
  { value: "CHEM", label: "Môn Hóa" },
  { value: "BIO", label: "Môn Sinh" },
  { value: "ENG", label: "Môn Anh"}
];

export const getSubjectLabel = (value) => {
  let subject = SUBJECT.filter(e => e.value === value)[0];
  return subject.label;
}