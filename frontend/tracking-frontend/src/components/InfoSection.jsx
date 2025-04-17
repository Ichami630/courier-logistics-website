import { useEffect, useState } from 'react';
import { FaClock, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import api from '../utils/api';

const InfoSection = () => {
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
  const infoItems = [
    {
      id: 1,
      icon: <FaClock className="text-4xl text-primary-200" />,
      title: 'Opening Hours',
      description: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
    {
      id: 2,
      icon: <FaMapMarkerAlt className="text-4xl text-primary-200" />,
      title: 'Our Location',
      description: profile.address,
    },
    {
      id: 3,
      icon: <FaEnvelope className="text-4xl text-primary-200" />,
      title: 'Our Contact',
      description: 'contact@prioritymailsolutions.com',
    },
  ];

  return (
    <div className="hidden px-5 py-5 text-white bg-gray-900 md:flex md:px-10">
      <div className="grid w-full grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-3">
        {infoItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-5 transition-shadow bg-gray-800 rounded-lg shadow-lg hover:shadow-xl"
          >
            <div className="mr-5">{item.icon}</div>
            <div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="mt-1 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
