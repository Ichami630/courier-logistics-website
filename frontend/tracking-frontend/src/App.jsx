import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import Track from './pages/Track';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import ServicesPage from './pages/ServicesPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/admin/LoginPage'; // Import your login page
import Dashboard from './pages/admin/Dashboard';
import ShipmentForm from './components/admincomponents/ShipmentForm';
import AllShipments from './pages/admin/AllShipments';
import Setting from './pages/admin/Setting';

import { useState,useEffect } from 'react';
import Loader from './assets/loader.svg';


// Mock authentication function
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Check for token
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />; // Redirect to dashbord or to login if no token
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="track" element={<Track />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Login Route */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="shipment/allshipments" element={<AllShipments />} />
        <Route path="shipment/new-shipment" element={<ShipmentForm />} />
        <Route path="shipment/edit/:trackingNumber" element={<ShipmentForm />} />
        <Route path="settings" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <img src={Loader} alt="Loading..." style={{ width: '100px', height: '100px' }} />
        </div>
      )}
      {!loading && (
        <div>
          <RouterProvider router={router} />
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default App;
