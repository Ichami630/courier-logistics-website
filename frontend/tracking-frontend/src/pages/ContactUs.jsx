import React from 'react';
import { useRef, useState } from 'react';
import { FaPhone,FaEnvelope } from 'react-icons/fa6'
import { FaMapMarker } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'
import Banner from '../components/Banner';
import contact from '../assets/images/contact.jpg';
import emailjs from '@emailjs/browser';
import Spinner from '../components/Spinner';
const ContactUs = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        from_name: '',
        reply_to: '',
        message: '',
        to_name: 'PriorityMailSolutions'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData((prev) => {
            return { ...prev, [name]: value}
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await emailjs.sendForm("service_ukzxi6j","template_znnk0g1",form.current, {publicKey: 'zzabxBmSCzZfvN7EF'});
            toast.success('submitted successfully!!');
        } catch (error) {
            toast.error('Error sending email. Please try again.');
            console.error(error);
        } finally{
            setLoading(false);
            setFormData({ name: '', email: '', message: '' });
        }
    }
    const breadcrumb = [
        { label: 'Home', path: '/' },
        { label: 'Contact Us', path: '/contact' },
      ];
  return (
    <div>
        <Spinner loading={loading} />
        <Banner
        image= {contact}
        title="Contact Us"
        breadcrumb={breadcrumb}
        />
        <div className="relative pb-24 px-10 mb-10 " id="contact">
            <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
            type: "spring",
            stiffness: 200,
            duration: 1.2,
            damping: 10
            }}
            viewport={{once: true}}
            className="my-10 text-4xl text-center">Contact Us</motion.h1>
        {/* Top Section */}
        <motion.div
        className="w-full px-8 py-12 text-white rounded-t-lg lg:h-56 lg:py-24 bg-primary-100">
            <h1 className="text-4xl font-bold">Get in Touch</h1>
            <p className="mt-2 text-sm">Any Question? Write and Send to Us.</p>
        </motion.div>

        {/* Main Content */}
        <div 
        className="grid grid-cols-1 gap-6 mt-0 bg-gray-100 border rounded-b-lg shadow-md lg:pb-28 lg:grid-cols-2 lg:mt-0 lg:overflow-hidden">
            {/* Left Section - Contact Details */}
            <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.3 }
            },
            viewport: {
                once: true,
            }
            }}
            className="hidden p-8 space-y-6 bg-gray-100 md:block">
            {/* Email */}
            <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex items-center ">
                <div className='rounded-full bg-gray-400 p-2'>
                    <FaEnvelope className="text-accent-100" />
                </div>
                <span className="ml-2 text-neutral-600">info@prioritymailsolutions.com</span>
            </motion.div>

            {/* Address */}
            <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex items-center">
                <div className='rounded-full bg-gray-400 p-2'>
                    <FaMapMarker className="text-accent-100" />
                </div>
                <span className="ml-2 text-neutral-600">123 Main Street, Cityville, Country</span>
            </motion.div>

            {/* Phone */}
            <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex items-center">
                <div className='rounded-full bg-gray-400 p-2'>
                    <FaPhone className="text-accent-100" />
                </div>
                <span className="ml-2 text-neutral-600">+123 456 7890</span>
            </motion.div>
            </motion.div>

            {/* Right Section - Form */}
            <div className="flex items-center lg:absolute lg:top-0 lg:z-10  lg:bottom-10 lg:right-20 lg:w-1/2">
            <motion.div
            whileInView={{ x: 0, opacity: 1 }} 
            initial={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", duration: 2.5 }}
            viewport = {{ once: true }}
            className="w-full p-8 bg-white rounded-lg shadow-lg lg:rounded-tr-lg lg:rounded-br-lg">
                <h2 className="mb-4 text-xl font-medium text-center text-black">Send US a Message</h2>
                <form ref={form} onSubmit={submitForm}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                    name='from_name'
                    onChange={handleChange}
                    type="text"
                    className="w-full p-2 mt-1 text-black border rounded focus:outline-none focus:ring-2 focus:ring-secondary-300"
                    placeholder="Your Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    name='reply_to'
                    onChange={handleChange}
                    type="email"
                    className="w-full p-2 mt-1 text-black border rounded focus:outline-none focus:ring-2 focus:ring-secondary-300"
                    placeholder="Your Email"
                    />
                </div>
                <input type="hidden" name="to_name" />
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                    name='message'
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 mt-1 text-black border rounded focus:outline-none focus:ring-2 focus:ring-secondary-300"
                    placeholder="Your Message"></textarea>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    animate={{
                    y: [0, -5, 0],
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                    }
                    }}
                    type="submit"
                    className="px-4 py-2 text-white rounded bg-accent-100 hover:bg-secondary-400">
                    Send Message
                </motion.button>
                </form>
            </motion.div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ContactUs;
