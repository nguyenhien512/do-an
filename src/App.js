import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Exam from './Pages/Exam/Exam';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/exam" element={<Exam/>} />
    </Routes>
  </Router>
  )}

export default App;
