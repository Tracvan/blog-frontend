import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserDetail.css';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`, config);
            setUser(response.data);
        } catch (error) {
            console.error("There was an error fetching the user details!", error);
        }
    };

    const handleToggleLock = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            if (user.status === 'Lock') {
                await axios.put(`http://localhost:8080/api/admin/users/unlock/${id}`, null, config);
                toast.success('User unlocked successfully');
                setUser({ ...user, status: 'Active' });
            } else if (user.status === 'Active') {
                await axios.put(`http://localhost:8080/api/admin/users/lock/${id}`, null, config);
                toast.success('User locked successfully');
                setUser({ ...user, status: 'Lock' });
            }
        } catch (error) {
            console.error("There was an error toggling the user lock status!", error);
            toast.error('There was an error toggling the user lock status');
        }
    };

    const handleCancel = () => {
        navigate('/admin/users');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="flex items-start justify-center min-h-screen py-8">
            <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <ToastContainer />
                <div className="avatar-container mb-4">
                    <img src={user.avatar} alt="avatar" className="avatar" />
                </div>
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.username}</h1>
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Created At:</strong> {formatDate(user.date)}</p>
                    <p><strong>Full Name:</strong> {user.fullName}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                </div>
                <div className="actions flex justify-between">
                    <button
                        onClick={handleToggleLock}
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${user.status === 'Lock' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300' : 'bg-red-600 hover:bg-red-700 focus:ring-red-300'}`}
                    >
                        {user.status === 'Lock' ? 'Unlock' : 'Lock'}
                    </button>
                    <button onClick={handleCancel} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-blue-300">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
