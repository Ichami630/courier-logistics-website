import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiveChat from '../components/LiveChat';

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <ToastContainer />
        <LiveChat />
        <Footer />
    </>
  )
}

export default MainLayout