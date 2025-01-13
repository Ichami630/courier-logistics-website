import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdPerson, MdSettings, MdLocalShipping } from "react-icons/md";
import { IoLogOutOutline, IoClose } from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Dropdown icons

const Sidebar = ({ isOpen, closeSidebar }) => {
  // State to manage open dropdowns
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle dropdown menus dynamically by ID
  const toggleDropdown = (id) =>
    setOpenDropdown(openDropdown === id ? null : id);

  // Sidebar items structure
  const sidebarItems = [
    { id: 1, title: "Dashboard", icon: <MdDashboard />, path: "/admin" },
    { id: 2, title: "Profile", icon: <MdPerson />, path: "/admin/profile" },
    { id: 3, title: "Settings", icon: <MdSettings />, path: "/admin/settings" },
    { 
      id: 4, 
      title: "Shipment", 
      icon: <MdLocalShipping />, 
      children: [ // Nested children for dropdown items
        { id: 4.1, title: "New Shipment", path: "/admin/shipment/new" },
        { id: 4.2, title: "All Shipments", path: "/admin/shipment/all" },
      ],
    },
    { id: 5, title: "Logout", icon: <IoLogOutOutline />, path: "/logout" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-gray-100 flex flex-col transition-transform duration-300 z-40 md:static ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
        <h1 className="text-lg font-bold">Prioritymail</h1>
        <button className="text-gray-100 md:hidden" onClick={closeSidebar}>
          <IoClose size={24} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            {/* Parent Items */}
            <div>
              <button
                className={`flex items-center w-full p-4 hover:bg-gray-700 focus:outline-none ${
                  item.children ? "" : "cursor-pointer"
                }`}
                onClick={() => item.children && toggleDropdown(item.id)}
              >
                <span className="mr-4 text-xl">{item.icon}</span>
                {item.title}
                {/* Dropdown toggle icon for items with children */}
                {item.children && (
                  <span className="ml-auto">
                    {openDropdown === item.id ? (
                      <FiChevronUp size={20} />
                    ) : (
                      <FiChevronDown size={20} />
                    )}
                  </span>
                )}
              </button>
            </div>

            {/* Dropdown Menu for Children */}
            {item.children && openDropdown === item.id && (
              <div className="pl-8">
                {item.children.map((child) => (
                  <NavLink
                    key={child.id}
                    to={child.path}
                    className={({ isActive }) =>
                      `flex items-center p-4 hover:bg-gray-700 ${
                        isActive ? "bg-gray-700 text-accent-200" : ""
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    {child.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
