import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import Login from './pages/Login'; // Import the Login component
import Home from './pages/Home'; // Import the Home component

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const token = localStorage.getItem('jwt'); // Check if JWT is present
  const isLoginPage = window.location.pathname === '/login'; // Check if on login page

  return (
    <>
      {!isLoginPage && token && <ResponsiveAppBar />} {/* Show navbar only if not on login page and token exists */}
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} /> {/* Protect Home route */}
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect any undefined routes to login */}
      </Routes>
    </>
  );
}

export default App;
