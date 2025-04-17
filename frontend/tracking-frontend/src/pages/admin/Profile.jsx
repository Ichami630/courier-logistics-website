import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';

export default function Profile() {
  const [profile, setProfile] = useState({});

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

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("updateProfile.php",{
        id: profile.id,
        username: profile.username,
        email: profile.email,
        number: profile.number,
        address: profile.address,
      })

      if(response.data.success){
        toast.success("profile update successfully")
      }else {
        toast.error(response.data.message || "Failed to update profile");
      }
      
    } catch (error) {
      console.error('Password update error:', error);
        toast.error("An error occurred while updating the password")
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword){
        toast.error("passwords donot match")
        return
    }

    try {
        const response = await api.post("/updatePassword.php",{
            id: profile.id,
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmPassword: passwords.confirmPassword,
        })

        if(response.data.success){
            setPasswords({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            toast.success("password updated successfully")
        }else{
            toast.error(response.data.message)
        }
        
    } catch (error) {
        console.error('Password update error:', error);
        toast.error("An error occurred while updating the password")
    }
  };

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">Update profile</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profile Summary */}
        {/* <div className="p-6 bg-white shadow-md rounded-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 overflow-hidden border-4 border-gray-200 rounded-full">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <label className="mt-4 text-blue-600 cursor-pointer hover:underline">
              Change Photo
              <input type="file" className="hidden" />
            </label>
            <h3 className="mt-4 text-xl font-semibold">{profile.name}</h3>
            <p className="text-sm text-gray-500">Super Admin</p>
            <span className="inline-block px-3 py-1 mt-2 text-xs text-green-700 bg-green-100 rounded-full">
              Active
            </span>
          </div>
        </div> */}

        {/* Profile Form */}
        <div className="p-6 bg-white shadow-md md:col-span-3 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-lg font-semibold">Personal Info</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={profile.username || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="number"
                placeholder="Phone"
                value={profile.number || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <textarea
              name="address"
              placeholder="address"
              value={profile.address || ''}
              onChange={handleChange}
              className="w-full p-2 mt-4 border rounded-md"
              required
            />
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>

          <hr className="my-6" />

          {/* Password Change */}
          <form onSubmit={handlePasswordSubmit}>
            <h3 className="mb-4 text-lg font-semibold">Change Password</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
