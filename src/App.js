import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Exam from './Pages/Exam/Exam';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="m-0 vw-100 vh-100">
      <Header/>
      <Exam/>
    </div>
  )}

export default App;
