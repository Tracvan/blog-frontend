import React, { useState } from 'react';
import './UserList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;
    const users = [];

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const navigate = useNavigate

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error);
            // Xử lý lỗi nếu cần
        }

        return (
            <div className="user-list-container">
                <h2 className="text-center text-gray-900">User list</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
                <div className="user-list-table">
                    <table className="user-list">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Date of Birth</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentUsers.length > 0 ? (
                                    currentUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td>{user.dob}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-600">No users found</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    {[...Array(totalPages).keys()].map(pageNumber => (
                        <button
                            key={pageNumber + 1}
                            onClick={() => paginate(pageNumber + 1)}
                            className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>
            </div>
        );
    };
}

export default UserList;
