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
import NewShipment from './pages/admin/NewShipment';
import AllShipments from './pages/admin/AllShipments';
import EditShipment from './pages/admin/EditShipment';
import Setting from './pages/admin/Setting';


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
        <Route path="shipment/new-shipment" element={<NewShipment />} />
        <Route path="shipment/allshipments" element={<AllShipments />} />
        <Route path="shipment/edit/:trackingNumber" element={<EditShipment />} />
        <Route path="settings" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>);
};

export default App;
