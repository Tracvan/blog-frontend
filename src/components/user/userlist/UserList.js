import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div>
            <h1>User List</h1>
            {/*<table className="table-auto">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>Username</th>*/}
            {/*        <th>Created At</th>*/}
            {/*        <th>Avatar</th>*/}
            {/*        <th>Full Name</th>*/}
            {/*        <th>Status</th>*/}
            {/*        <th>Actions</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {users.map(user => (*/}
            {/*        <tr key={user.id}>*/}
            {/*            <td>{user.username}</td>*/}
            {/*            <td>{formatDate(user.date)}</td>*/}
            {/*            <td><img src={user.avatar} alt="avatar" style={{ width: '50px', height: '50px' }} /></td>*/}
            {/*            <td>{user.fullName}</td>*/}
            {/*            <td>{user.status}</td>*/}
            {/*            <td>*/}
            {/*                <button onClick={() => navigate(`/user/${user.id}`)} className="btn btn-info">View</button>*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>
                        <td className="px-6 py-4">
                            $2999
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserList;
