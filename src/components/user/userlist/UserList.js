import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let role = localStorage.getItem('authorize')
        if(role !== "ROLE_ADMIN") {
            navigate('/access-denined')
        }
        else {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            try {
                const response = await axios.get('http://localhost:8080/api/admin/users', config);
                setUsers(response.data);
            } catch (error) {
                console.log(error)
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="w-full px-4 sm:px-8">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h1 className="text-2xl font-semibold leading-tight text-gray-100 uppercase tracking-wider">
                        User List
                    </h1>
                </div>
                <div className="overflow-x-auto">
                    <div className="w-full shadow rounded-lg overflow-hidden bg-transparent">
                        <table className="w-full leading-normal bg-transparent">
                            <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                    Username
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                    Created At
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                    Avatar
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                    Full Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                    Status
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider bg-transparent">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="bg-transparent">
                                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                        <p className="text-gray-100 whitespace-no-wrap">{user.username}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                        <p className="text-gray-100 whitespace-no-wrap">{formatDate(user.date)}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                        <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                        <p className="text-gray-100 whitespace-no-wrap">{user.fullName}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                        <p className={`text-gray-100 whitespace-no-wrap ${user.status === 'locked' ? 'text-red-600' : 'text-green-600'}`}>
                                            {user.status}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                                        <button
                                            onClick={() => navigate(`/admin/user/${user.id}`)}
                                            className="text-indigo-400 hover:text-indigo-600"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
