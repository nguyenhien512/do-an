import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROLE } from "./util/enum";
import StudentDashboardPage from './Pages/dashboard/StudentDashboardPage'
import StudentExamPage from './Pages/Exam/StudentExamPage'
import TeacherDashboardPage from './Pages/dashboard/TeacherDashboardPage'
import LayoutMain from './Components/Layout/LayoutMain'

import RequireAuth from './Pages/requireAuth/RequireAuth';
import { AuthProvider } from './context/AuthProvider';
import LoginPage from './Pages/login/LoginPage';
import Layout from 'antd/es/layout/layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<LoginPage/>}>

        </Route>
        <Route path='user'>
          <Route element={<RequireAuth allowedRoles={[ROLE.USER]} />}>
            <Route index  element={<LayoutMain content={<StudentExamPage/>}></LayoutMain>}>

            </Route>

          </Route>

        </Route>
        <Route path='teacher'>
          <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN]} />}>

            <Route index element={<LayoutMain content={<TeacherDashboardPage/>}></LayoutMain>}>

            </Route>

            <Route path='testbank' element={<>Test bank dashboard</>}>

            </Route>

            <Route path='student' element={<>Manage class page</>}>
            </Route>


            <Route path='student/create' element={<>Create student page</>}>
            </Route>
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
