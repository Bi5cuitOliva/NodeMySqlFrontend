import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Navbar from './components/Navbar';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import HomePage from './components/Homepage';
import AddStudent from './components/AddStudent';
import GetAllStudents from './components/GetAllStudents';
import UpdateStudent from './components/updateStudent';
import DeleteStudent from './components/deleteStudent';
function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/add-student" element={<RegisterStudent />} />
      <Route path="/view-students" element={<LoginStudent />} /> */}
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/add-student" element={<AddStudent/>} />
      <Route path="/view-students" element={<GetAllStudents/>} />
      <Route path="/updateStudent/:_id" element={<UpdateStudent/>}/>
      <Route path="/deleteStudent/:student_id" element={<DeleteStudent/>}/>
    </Routes>
  </Router>
  );
}

export default App;
