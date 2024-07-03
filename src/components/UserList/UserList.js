// src/components/UserList.js
import React,  { useState }  from 'react';
import './UserList.css';

const UserList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;
    const users = [
        { username: 'Hieu', dob: '1990-01-01', address: '123 Main St', phoneNumber: '123-456-7890', status: 'Active' },
        { username: 'Hieu2', dob: '1992-02-02', address: '456 Elm St', phoneNumber: '987-654-3210', status: 'Inactive' },
        { username: 'Hieu3', dob: '1985-03-03', address: '789 Oak St', phoneNumber: '234-567-8901', status: 'Active' },
        { username: 'Duong', dob: '1975-04-04', address: '101 Pine St', phoneNumber: '345-678-9012', status: 'Inactive' },
        { username: 'Duong2', dob: '1995-05-05', address: '202 Maple St', phoneNumber: '456-789-0123', status: 'Active' },
        { username: 'Duong3', dob: '1980-06-06', address: '303 Cedar St', phoneNumber: '567-890-1234', status: 'Inactive' },
        { username: 'Minh', dob: '1998-07-07', address: '404 Birch St', phoneNumber: '678-901-2345', status: 'Active' },
        { username: 'Minh2', dob: '1983-08-08', address: '505 Walnut St', phoneNumber: '789-012-3456', status: 'Inactive' },
        { username: 'Minh3', dob: '1991-09-09', address: '606 Ash St', phoneNumber: '890-123-4567', status: 'Active' },
        { username: 'Duong Minh Hieu', dob: '1978-10-10', address: '707 Elm St', phoneNumber: '901-234-5678', status: 'Inactive' },
        { username: 'Duong Minh Hieu2', dob: '1987-11-11', address: '808 Oak St', phoneNumber: '012-345-6789', status: 'Active' },
        { username: 'Duong Minh Hieu3', dob: '1993-12-12', address: '909 Pine St', phoneNumber: '123-456-7890', status: 'Inactive' },
        { username: 'Khoa', dob: '1994-01-13', address: '101 Maple St', phoneNumber: '234-567-8901', status: 'Active' },
        { username: 'Trinh', dob: '1974-02-14', address: '202 Cedar St', phoneNumber: '345-678-9012', status: 'Inactive' },
        { username: 'Trinh Khoa', dob: '1989-03-15', address: '303 Birch St', phoneNumber: '456-789-0123', status: 'Active' },
        { username: 'Van', dob: '1990-04-16', address: '404 Walnut St', phoneNumber: '567-890-1234', status: 'Inactive' },
        { username: 'Trac', dob: '1986-05-17', address: '505 Ash St', phoneNumber: '678-901-2345', status: 'Active' },
        { username: 'Trac Van', dob: '1982-06-18', address: '606 Elm St', phoneNumber: '789-012-3456', status: 'Inactive' },
        { username: 'Trinh Luu Khoa', dob: '1997-07-19', address: '707 Oak St', phoneNumber: '890-123-4567', status: 'Active' },
        { username: 'Truong Trac Van', dob: '1979-08-20', address: '808 Pine St', phoneNumber: '901-234-5678', status: 'Inactive' },{ username: 'Hieu', dob: '1990-01-01', address: '123 Main St', phoneNumber: '123-456-7890', status: 'Active' },
        { username: 'dddddddddddd', dob: '1992-02-02', address: '456 Elm St', phoneNumber: '987-654-3210', status: 'Inactive' },
        { username: 'fffffffffffffff', dob: '1985-03-03', address: '789 Oak St', phoneNumber: '234-567-8901', status: 'Active' },
        { username: 'fffffffffffff', dob: '1975-04-04', address: '101 Pine St', phoneNumber: '345-678-9012', status: 'Inactive' },
        { username: 'eeeeeeeeeeeeeeee', dob: '1995-05-05', address: '202 Maple St', phoneNumber: '456-789-0123', status: 'Active' },
        { username: 'ffffe', dob: '1980-06-06', address: '303 Cedar St', phoneNumber: '567-890-1234', status: 'Inactive' },
        { username: 'qqqq', dob: '1998-07-07', address: '404 Birch St', phoneNumber: '678-901-2345', status: 'Active' },
        { username: 'ggggggggggwer', dob: '1983-08-08', address: '505 Walnut St', phoneNumber: '789-012-3456', status: 'Inactive' },
        { username: 'eeeeeeeeeeeeeeeeeeeeeee', dob: '1991-09-09', address: '606 Ash St', phoneNumber: '890-123-4567', status: 'Active' },
        { username: 'Duong ggggggggggggg Hieu', dob: '1978-10-10', address: '707 Elm St', phoneNumber: '901-234-5678', status: 'Inactive' },
        { username: 'Dhhhhhhhhh Hieu2', dob: '1987-11-11', address: '808 Oak St', phoneNumber: '012-345-6789', status: 'Active' },
        { username: 'jjjjjjjjjjjjjjjjj Minh Hieu3', dob: '1993-12-12', address: '909 Pine St', phoneNumber: '123-456-7890', status: 'Inactive' },
        { username: 'kkkkkkkkkkk', dob: '1994-01-13', address: '101 Maple St', phoneNumber: '234-567-8901', status: 'Active' },
        { username: 'Trinh', dob: '1974-02-14', address: '202 Cedar St', phoneNumber: '345-678-9012', status: 'Inactive' },
        { username: 'uuuuuuuuuuuuuuuuuuu Khoa', dob: '1989-03-15', address: '303 Birch St', phoneNumber: '456-789-0123', status: 'Active' },
        { username: 'fffffff', dob: '1990-04-16', address: '404 Walnut St', phoneNumber: '567-890-1234', status: 'Inactive' },
        { username: 'lllllllllllll', dob: '1986-05-17', address: '505 Ash St', phoneNumber: '678-901-2345', status: 'Active' },
        { username: '4444444447777774477777', dob: '1982-06-18', address: '606 Elm St', phoneNumber: '789-012-3456', status: 'Inactive' },
        { username: '77777777777777 Luu Khoa', dob: '1997-07-19', address: '707 Oak St', phoneNumber: '890-123-4567', status: 'Active' },
        { username: '666666666666666 Trac Van', dob: '1979-08-20', address: '808 Pine St', phoneNumber: '901-234-5678', status: 'Inactive' },
    ];

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

export default UserList;
