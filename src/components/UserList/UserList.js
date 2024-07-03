// src/components/UserList.js
import React from 'react';
import './UserList.css';

const UserList = () => {
    const users = [
        { username: 'john_doe', dob: '1990-01-01', address: '123 Main St', phoneNumber: '123-456-7890', status: 'Active' },
        { username: 'jane_doe', dob: '1992-02-02', address: '456 Elm St', phoneNumber: '987-654-3210', status: 'Inactive' },
    ];

    return (
        <div className="user-list-container">
            <h2 className="text-center text-gray-900">User list</h2>
            <table className="user-list-table">
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
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.dob}</td>
                        <td>{user.address}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
