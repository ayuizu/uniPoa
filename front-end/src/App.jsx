import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
import AdminRoute from "./components/AdminRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import MatriculaPage from "./pages/MatriculaPage";
import GradeAlunoPage from "./pages/GradeAlunoPage";
import TurmasPage from "./pages/TurmasPage";
import GradeProfessorPage from "./pages/GradeProfessorPage";


function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/login' Component={LoginPage} />


          <Route path='/contact' Component={ContactPage} />
          <Route path='/faq' Component={FAQPage} />

          <Route path='/user' element={<AdminRoute><UserPage /></AdminRoute>} />

          {/* Aluno */}
          <Route path='/matricula' element={<AdminRoute isAdmin={false}><MatriculaPage /></AdminRoute>} />
          <Route path='/grade' element={<AdminRoute isAdmin={false}><GradeAlunoPage /></AdminRoute>} />

          {/* Administrador */}
          <Route path='/turmas' element={<AdminRoute isAdmin={true}><TurmasPage /></AdminRoute>} />
          <Route path='/grade-professor' element={<AdminRoute isAdmin={true}><GradeProfessorPage /></AdminRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
