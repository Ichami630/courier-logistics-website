const Footer = () => {
    return (
      <footer className="bg-secondary-100 text-white py-8">
        <div className="container mx-8">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="text-lg font-semibold mb-2">About Us</h4>
              <h2 className="text-primary-200 text-3xl mb-2 font-bold">USPS</h2>
              <p className="text-sm">
                We are dedicated to providing top-notch services and ensuring customer satisfaction. Explore our services to learn more.
              </p>
            </div>
  
            {/* Column 2 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-primary-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-primary-200">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-primary-200">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary-200">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Column 3 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <p className="text-sm">
                123 Main Street, Cityville, Country
              </p>
              <p className="text-sm">Email: info@yourwebsite.com</p>
              <p className="text-sm">Phone: +123 456 7890</p>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
            &copy; {new Date().getFullYear()} USPS. All Rights Reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  