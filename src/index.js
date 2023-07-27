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
import StudentTestResultPage from './Pages/student/StudentTestPage'
import StudentTestPage from './Pages/student/StudentTestPage'
import TeacherExamPage from './Pages/Exam/TeacherExamPage';
import TeacherTestPage from './Pages/Exam/TeacherTestPage';
import TeacherTestResultPage from './Pages/Exam/TeacherTestResultPage';
import StatisticPage from "./Pages/statistics/StatisticPage";
import TeacherExamSettingPage from './Pages/Exam/TeacherExamSettingPage';
import ManageClassPage from './Pages/manage-class/ManageClass';
import ClassDetailPage from './Pages/manage-class/ClassDetailPage';
import TeacherDashboardPage from './Pages/dashboard/TeacherDashboardPage';
import TestBankPage from './Pages/testbank/TestBankPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<LoginPage />}>

        </Route>
        <Route path='user'>
          <Route element={<RequireAuth allowedRoles={[ROLE.STUDENT]} />}>
            <Route index element={<LayoutMain content={<StudentDashboardPage />} title="Màn hình chính"></LayoutMain>}>
            </Route>
            <Route path="exam" >
              <Route exact index element={<LayoutMain content={<StudentExamPage />} title="Thi online"></LayoutMain>} />
              <Route path='create-exam' element={<LayoutMain content={<StudentTestPage />} title="Thi online"></LayoutMain>} />
              <Route path='result' element={<LayoutMain content={<StudentTestResultPage />} title="Thi online"></LayoutMain>} />
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
              <Route path='test-result' element={<LayoutMain content={<TeacherTestResultPage />} title="Quản lý đề thi"></LayoutMain>} />
            </Route>

            <Route path='testbank' >
            <Route exact index element={<LayoutMain content={<TestBankPage />} title="Ngân hàng câu hỏi"></LayoutMain>} />
            </Route>

            <Route path='class'>
              <Route exact index element={<LayoutMain content={<ManageClassPage />} title="Quản lý lớp"></LayoutMain>} />
              <Route path='class-detail' element={<LayoutMain content={<ClassDetailPage />} title="Quản lý lớp"></LayoutMain>} />
            </Route>

            <Route path='statistics' element={<LayoutMain content={<StatisticPage />} title="Thống kê"></LayoutMain>} />
          </Route>

        </Route>

      </Routes>
    </AuthProvider>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
