import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import WeightPage from './pages/WeightPage'
import MedicinesPage from "./pages/MedicinesPage";
import SymptomsPage from "./pages/SymptomsPage";
import VaccinesPage from "./pages/VaccinesPage";
import BloodPressurePage from "./pages/BloodPressurePage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ProfilePage from "./pages/ProfilePage";
import Relatory from './components/RelatoryPage';


function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />


          <Route path='/about' Component={AboutPage} />
          <Route path='/contact' Component={ContactPage} />
          <Route path='/faq' Component={FAQPage} />

          <Route path='/user' element={<ProtectedRoute isLoggedIn={true} > <UserPage /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute isLoggedIn={true} > <ProfilePage /></ProtectedRoute>} />
          <Route path='/medicines' element={<ProtectedRoute isLoggedIn={true}> <MedicinesPage /></ProtectedRoute>} />
          <Route path='/weight' element={<ProtectedRoute isLoggedIn={true} > <WeightPage /></ProtectedRoute>} />
          <Route path='/symptoms' element={<ProtectedRoute isLoggedIn={true} > <SymptomsPage /></ProtectedRoute>} />
          <Route path='/vaccines' element={<ProtectedRoute isLoggedIn={true} > <VaccinesPage /></ProtectedRoute>} />
          <Route path='/bloodPressure' element={<ProtectedRoute isLoggedIn={true} > <BloodPressurePage /></ProtectedRoute>} />
          <Route path='/appointments' element={<ProtectedRoute isLoggedIn={true} > <AppointmentsPage /></ProtectedRoute>} />
          <Route path='/relatory' element={<ProtectedRoute isLoggedIn={true}><Relatory /></ProtectedRoute>} />


          {/* <Route path='/user' Component={UserPage} /> */}
          {/* <Route path='/medicines' Component={MedicinesPage} /> */}
          {/* <Route path='/symptoms' Component={SymptomsPage} /> */}
          {/* <Route path='/vaccines' Component={VaccinesPage} /> */}
          {/* <Route path='/weight' Component={WeightPage} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
