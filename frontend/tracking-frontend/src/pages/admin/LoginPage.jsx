
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect( () => {
    const message = localStorage.getItem('logoutMessage');
    if(message){
        toast.success(message);
        setTimeout( () => localStorage.removeItem('logoutMessage'), 1000 ); //allow message to display before removal
    }
  }, [] );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('login.php', {
        email: email,
        password: password
      }); // Send credentials as an object
  
      localStorage.setItem('token', response.data.token); // Save token
      localStorage.setItem('loginMessage', 'You have successfully login!');
      navigate('/admin'); // Redirect to admin dashboard
    } catch (error) {
      toast.error('Invalid password or username');
    }
  };
  

  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
            Login to Your Account
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
                </label>
                <input
                type="email"
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
            {/* Password Field */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                value={password}
                name='password'
                placeholder="Enter your password"
                onChange={ (e)=> setPassword(e.target.value) }
                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
                <label className="flex items-center">
                <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
                </a>
            </div>
            {/* Submit Button */}
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Login
            </button>
            </form>
            {/* Register Link */}
            {/* <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
                Register
            </a>
            </p> */}
        </div>
        </div>
        <ToastContainer />
    </>
  );
};

export default LoginPage;
