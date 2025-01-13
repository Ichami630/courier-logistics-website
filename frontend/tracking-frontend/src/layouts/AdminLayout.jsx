import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admincomponents/Sidebar";
import Navbar from "../components/admincomponents/Navbar";
import Footer from "../components/admincomponents/Footer";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

        {/* Main Content */}
        <div className="relative flex flex-col flex-1">
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Page Content */}
          <div
            className="flex-1 p-6 bg-gray-100"
            onClick={isSidebarOpen ? closeSidebar : undefined}
          >
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
