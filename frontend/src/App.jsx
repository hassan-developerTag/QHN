import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import KYCVerification from './components/KYCVerification';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/signup" element={
            <Signup />
          } />
          <Route path="/kycVerification" element={
            <ProtectedRoute>
              <KYCVerification />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
