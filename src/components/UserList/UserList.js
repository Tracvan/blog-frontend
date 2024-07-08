// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './UserList.css';
// import Header from '../components/Header/index';
//
//
// const UserList = () => {
//
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const navigate = useNavigate();
//     const usersPerPage = 20;
//
//
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/admin/users');
//             setUsers(response.data);
//             setFilteredUsers(response.data);
//         } catch (error) {
//             console.error("There was an error fetching the users!", error);
//         }
//     };
//
//     const formatDate = (dateString) => {
//         const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
//         return new Date(dateString).toLocaleDateString('en-GB', options);
//     };
//
//     const handleSearch = (searchTerm) => {
//         const filtered = users.filter(user =>
//             user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(filtered);
//         setCurrentPage(1); // Reset page to 1 on search
//     };
//
//     const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
//     const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
//
//     const handlePageClick = (page) => {
//         setCurrentPage(page);
//     };
//
//
//         return (
//             <div className="container">
//                 {/*<Header onSearch={handleSearch} /> {}*/}
//                 <div className="user-list-container">
//                     <h1 className="text-center">User List</h1>
//                     <table className="user-list-table w-full">
//                         <thead>
//                         <tr>
//                             <th>Username</th>
//                             <th>Created At</th>
//                             <th>Avatar</th>
//                             <th>Full Name</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {users.map(user => (
//                             <tr key={user.id}>
//                                 <td>{user.username}</td>
//                                 <td>{formatDate(user.date)}</td>
//                                 <td><img src={user.avatar} alt="avatar" style={{width: '50px', height: '50px'}}/></td>
//                                 <td>{user.fullName}</td>
//                                 <td>{user.status}</td>
//                                 <td>
//                                     <button onClick={() => navigate(`/user/${user.id}`)} className="btn btn-info">View
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                     <div className="pagination">
//                         {[...Array(totalPages).keys()].map(page => (
//                             <span
//                                 key={page}
//                                 className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}
//                                 onClick={() => handlePageClick(page + 1)}
//                             >
//                             {page + 1}
//                         </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         );
//
// };
// export default UserList;
