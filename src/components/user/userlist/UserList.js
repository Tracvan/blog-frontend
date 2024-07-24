import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
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
                setSearchResults(response.data); // Ban đầu searchResults bằng với users
            } catch (error) {
                console.log(error)
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setSearchResults(users);
        } else {
            const filtered = users.filter(user =>
                user.username.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResults(filtered);
        }
    }

    return (
        <div className="w-full px-4 sm:px-8">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h1 className="text-1.9xl font-semibold leading-tight text-gray-100 uppercase tracking-wider">
                        User List
                    </h1>
                    <form className="max-w-l ml-180" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative">
                            <button type="submit" className="absolute left-0 top-1/2 -translate-y-1/2">
                                <svg
                                    className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                        fill=""
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                        fill=""
                                    />
                                </svg>
                            </button>
                            <input
                                style={{border: 0}}
                                onChange={handleSearch}
                                type="text"
                                placeholder="Search by username"
                                className="w-full bg-transparent pl-9 pr-4 text-gray-100 focus:outline-none xl:w-125"
                                value={searchTerm}
                            />
                        </div>
                    </form>
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
                            {(searchTerm ? searchResults : users).map((user) => (
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
                                        <p className={`text-gray-100 whitespace-no-wrap ${user.status === 'Lock' ? 'text-red-600' : 'text-green-600'}`}>
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
