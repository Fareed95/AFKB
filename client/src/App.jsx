import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
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
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <ResponsiveAppBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Ensure Home route is defined */}
      </Routes>
    </>
  );
}

export default App;
