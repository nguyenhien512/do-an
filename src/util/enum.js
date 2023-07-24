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
