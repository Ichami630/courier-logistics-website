import { useEffect, useState } from "react";
import api from "../utils/api";

const Footer = () => {

  const [profile,setProfile] = useState({})

  useEffect(()=>{
    const fetchAll = async ()=>{
        try {
            const response = await api.get('getUserInfo.php')
            if(response.data.success){
                setProfile(response.data.profile)
            }
        } catch (error) {
            console.error(error)
        }
    };
    fetchAll();
  },[])
    return (
      <footer className="py-8 text-white bg-secondary-100">
        <div className="container px-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Column 1 */}
            <div>
              <h4 className="mb-2 text-lg font-semibold">About Us</h4>
              <h2 className="mb-2 text-3xl font-bold text-primary-200">Priority Mail</h2>
              <p className="text-sm">
                We are dedicated to providing top-notch services and ensuring customer satisfaction. Explore our services to learn more.
              </p>
            </div>
  
            {/* Column 2 */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
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
              <h4 className="mb-4 text-lg font-semibold">Contact Info</h4>
              <p className="text-sm">
                {profile.address}
              </p>
              <p className="text-sm">Email: info@prioritymailsolutions.com</p>
              <p className="text-sm">Phone: {profile.number}</p>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="pt-4 mt-8 text-sm text-center border-t border-gray-700">
            &copy; {new Date().getFullYear()} prioritymailsolutions. All Rights Reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  