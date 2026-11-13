import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
import AdminRoute from "./components/AdminRoute";
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

          <Route path='/user' element={<AdminRoute isAdmin={true}> <UserPage /></AdminRoute>} />
          <Route path='/profile' element={<AdminRoute isAdmin={true}> <ProfilePage /></AdminRoute>} />
          <Route path='/medicines' element={<AdminRoute isAdmin={true}> <MedicinesPage /></AdminRoute>} />
          <Route path='/weight' element={<AdminRoute isAdmin={true}> <WeightPage /></AdminRoute>} />
          <Route path='/symptoms' element={<AdminRoute isAdmin={true}> <SymptomsPage /></AdminRoute>} />
          <Route path='/vaccines' element={<AdminRoute isAdmin={true}> <VaccinesPage /></AdminRoute>} />
          <Route path='/bloodPressure' element={<AdminRoute isAdmin={true}> <BloodPressurePage /></AdminRoute>} />
          <Route path='/appointments' element={<AdminRoute isAdmin={true}> <AppointmentsPage /></AdminRoute>} />
          <Route path='/relatory' element={<AdminRoute isAdmin={true}><Relatory /></AdminRoute>} />


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