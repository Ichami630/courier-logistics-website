import { FiMenu, FiBell, FiSearch } from "react-icons/fi";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-6">
      {/* Hamburger Menu */}
      <button className="text-gray-600 md:hidden" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>

      {/* Search Box */}
      <div className="flex items-center w-2/3 max-w-xs px-4 py-2 bg-gray-100 rounded-lg md:max-w-md">
        <FiSearch className="mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent focus:outline-none"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600">
          <FiBell size={24} className="text-primary-100" />
        </button>
        <img
          src="https://via.placeholder.com/40"
          alt="Admin Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
