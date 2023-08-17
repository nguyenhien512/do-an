import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROLE } from "./util/enum";
import StudentDashboardPage from './Pages/dashboard/StudentDashboardPage'
import TestBankDashboardPage from './Pages/testbank/TestBankPage'
import LayoutMain from './Components/Layout/LayoutMain'
import { ToastContainer } from "react-toastify";

import RequireAuth from './Pages/requireAuth/RequireAuth';
import { AuthProvider } from './context/AuthProvider';
import LoginPage from './Pages/login/LoginPage';
import Layout from 'antd/es/layout/layout';
import StudentExamPage from './Pages/student/StudentExamPage'
import StudentTestResultPage from './Pages/student/StudentTestResultPage'
import StudentTestPage from './Pages/student/StudentTestPage'
import StudentExamReviewPage from './Pages/student/StudentExamReviewPage';
import TeacherExamPage from './Pages/Exam/TeacherExamPage';
import TeacherTestPage from './Pages/Exam/TeacherTestPage';
import CommonTestResultPage from './Pages/Exam/CommonTestResultPage';
import StatisticPage from "./Pages/statistics/StatisticPage";
import TeacherExamSettingPage from './Pages/Exam/TeacherExamSettingPage';
import ManageClassPage from './Pages/manage-class/ManageClass';
import ClassDetailPage from './Pages/manage-class/ClassDetailPage';
import TeacherDashboardPage from './Pages/dashboard/TeacherDashboardPage';
import TestBankPage from './Pages/testbank/TestBankPage';
import  ThemeProvider from './context/ThemeProvider';
import ManageUserPage from './Pages/manage-user/ManageUserPage';
import AdminTestBankPage from './Pages/testbank/AdminTestBankPage';
import AdminDashboardPage from './Pages/dashboard/AdminDashboardPage';
import TeacherTestBankPage from './Pages/testbank/TeacherTestBankPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ThemeProvider>
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<LoginPage />}>

        </Route>
        <Route path='student'>
          <Route element={<RequireAuth allowedRoles={[ROLE.STUDENT]} />}>
            <Route index element={<LayoutMain content={<StudentDashboardPage />} title="Màn hình chính"></LayoutMain>}>
            </Route>
            <Route path="exam" >
              <Route exact index element={<LayoutMain content={<StudentExamPage />} title="Thi online"></LayoutMain>} />
              <Route path='create-exam' element={<LayoutMain content={<StudentTestPage />} title="Thi online"></LayoutMain>} />
              <Route path='result' element={<LayoutMain content={<StudentTestResultPage />} title="Thi online"></LayoutMain>} />
            </Route>
            <Route path='review' >
            <Route exact index element={<LayoutMain content={<StudentExamReviewPage />} title="Kết quả thi"></LayoutMain>} />
              <Route path='test-result' element={<LayoutMain content={<CommonTestResultPage showQuestionId={false}/>} title="Kết quả thi"></LayoutMain>} />
            </Route>
          </Route>
        </Route>
        <Route path='teacher'>
          <Route element={<RequireAuth allowedRoles={[ROLE.TEACHER]} />}>

            <Route index element={<LayoutMain content={<TeacherDashboardPage />} title="Màn hình chính"></LayoutMain>}>

            </Route>

            <Route path="exam" >
              <Route exact index element={<LayoutMain content={<TeacherExamPage />} title="Quản lý đề thi"></LayoutMain>} />
              <Route path='settings' element={<LayoutMain content={<TeacherExamSettingPage />} title="Quản lý đề thi"></LayoutMain>} />
              <Route path='tests' element={<LayoutMain content={<TeacherTestPage />} title="Quản lý đề thi"></LayoutMain>} />
              <Route path='test-result' element={<LayoutMain content={<CommonTestResultPage showQuestionId={true}/>} title="Quản lý đề thi"></LayoutMain>} />
            </Route>

            <Route path='testbank' >
              <Route exact index element={<LayoutMain content={<TeacherTestBankPage />} title="Ngân hàng câu hỏi"></LayoutMain>} />
            </Route>

            <Route path='class'>
              <Route exact index element={<LayoutMain content={<ManageClassPage />} title="Quản lý lớp học"></LayoutMain>} />
              <Route path='class-detail' element={<LayoutMain content={<ClassDetailPage />} title="Quản lý lớp học"></LayoutMain>} />
            </Route>

            <Route path='statistics' element={<LayoutMain content={<StatisticPage />} title="Thống kê"></LayoutMain>} />
          </Route>
        </Route>

        <Route path='admin'>
          <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN]} />}>
            <Route index element={<LayoutMain content={<AdminDashboardPage />} title="Màn hình chính"></LayoutMain>}>
            </Route>
            <Route path="manage-user" >
              <Route exact index element={<LayoutMain content={<ManageUserPage />} title="Quản lý người dùng"></LayoutMain>} />
            </Route>
            <Route path='testbank' >
            <Route exact index element={<LayoutMain content={<AdminTestBankPage />} title="Quản lý câu hỏi"></LayoutMain>} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
