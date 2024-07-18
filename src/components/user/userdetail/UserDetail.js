
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
    const [infoUser, setInfoUser] = useState(null)
    const [userDTO,setUserDTO] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`,config);
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

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
            toast.success('User deleted successfully');
            navigate('/admin/users');
        } catch (error) {
            console.error("There was an error deleting the user!", error);
            toast.error('There was an error deleting the user');
        }
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
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${user.status === 'locked' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300' : 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300'}`}
                    >
                        {user.status === 'lock' ? 'Active' : 'Lock'}
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-red-300">
                        Delete
                    </button>
                </div>

                {isModalOpen && (
                    <div id="popup-modal" tabindex="-1" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalOpen(false)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                                    <button onClick={handleDelete} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                        Yes, I'm sure
                                    </button>
                                    <button onClick={() => setIsModalOpen(false)} type="button" className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
