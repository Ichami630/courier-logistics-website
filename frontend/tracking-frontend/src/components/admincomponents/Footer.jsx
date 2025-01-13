const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="py-4 text-gray-600 bg-white shadow-md ">
        <div className="flex justify-center">
          <p>&copy; {currentYear} Prioritymailsolutions. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  