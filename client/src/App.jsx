import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import Login from './pages/Login'; // Import the Login component
import Home from './pages/Home'; // Import the Home component
import ShopHistoryPage from './pages/ShopHistory'; // Import the ShopHistoryPage component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer /> {/* Place ToastContainer here for global access */}
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const token = localStorage.getItem('jwt'); // Check if JWT is present
  const isLoginPage = window.location.pathname === '/login'; // Check if on login page

  const showToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <>
      {!isLoginPage && token && <ResponsiveAppBar />} {/* Show navbar only if not on login page and token exists */}
      <Routes>
        <Route path="/" element={token ? <Home showToast={showToast} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login showToast={showToast} />} />
        <Route path="/home" element={token ? <Home showToast={showToast} /> : <Navigate to="/login" />} />
        <Route path="/shop-history/:shopId" element={<ShopHistoryPage />} /> {/* New route for ShopHistoryPage */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
