import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        avatar: '',
        fullName: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/profile/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error("There was an error fetching the user details!", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/profile/${id}`, user);
            toast.success("User profile updated successfully!");
            navigate(`/user/profile/${id}`);
        } catch (error) {
            toast.error("Error updating user profile!");
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-start justify-center min-h-screen py-8">
            <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div className="avatar-container mb-4">
                        <img src={user.avatar} alt="avatar" className="avatar" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 dark:text-gray-400">Username</label>
                        <input
                            readOnly
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:shadow-outline bg-transparent"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 dark:text-gray-400">Email</label>
                        <input
                            readOnly
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:shadow-outline bg-transparent"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 dark:text-gray-400">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:shadow-outline bg-transparent"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 dark:text-gray-400">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:shadow-outline bg-transparent"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 dark:text-gray-400">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:shadow-outline bg-transparent"
                        />
                    </div>
                    <div className="actions flex justify-between">
                        <button type="submit" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-blue-300">Save</button>
                        <button type="button" onClick={() => navigate(`/user/profile/${id}`)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-red-300">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
