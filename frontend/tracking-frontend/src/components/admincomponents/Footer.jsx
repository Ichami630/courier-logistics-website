const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="py-4 text-gray-100 bg-gray-800 ">
        <div className="flex justify-center">
          <p>&copy; {currentYear} YourCompany. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  