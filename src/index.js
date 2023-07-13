import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import StudentDashboardPage from './pages/dashboard/StudentDashboardPage';
import StudentExamPage from './pages/exam/StudentExamPage';
import StudentExcercisePage from './pages/excercise/StudentExcercisePage';
import LoginPage from './pages/login/LoginPage';
import TeacherDashboardPage from './pages/dashboard/TeacherDashboardPage';
import TestBankDashboard from './pages/testbank/TestBankDashboard';
import ManageClassPage from './pages/manage-class/ManageClass';
import RequireAuth from './pages/requireAuth/RequireAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<LoginPage/>}>

      </Route>
        <Route path='user'>
        <Route element={<RequireAuth allowedRoles={["user"]}/>}>

          <Route index element={<StudentDashboardPage/>}>
          </Route>
          <Route path='exam' element={<StudentExamPage/>}>

          </Route>
          <Route path='excercise' element={<StudentExcercisePage/>}>

          </Route>
        </Route>

        </Route>
        <Route path='teacher'>
        <Route element={<RequireAuth allowedRoles={["teacher"]}/>}>

          <Route index element={<TeacherDashboardPage/>}>

          </Route>

          <Route path='testbank' element={<TestBankDashboard/>}>

          </Route>

          <Route path='student' element={<ManageClassPage/>}>
          </Route>


          <Route path='student/create' element={<>Create student page</>}>
          </Route>
        </Route>
     
        </Route>


    </Routes>
  
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
