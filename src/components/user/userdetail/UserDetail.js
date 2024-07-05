// src/components/UserDetail/UserDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/admin/users/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error("There was an error fetching the user details!", error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Detail</h1>
            <div>
                <strong>Username:</strong> {user.username}
            </div>
            <div>
                <strong>Created At:</strong> {user.createdAt}
            </div>
            <div>
                <strong>Avatar:</strong> <img src={user.avatar} alt="avatar" style={{ width: '100px', height: '100px' }} />
            </div>
            <div>
                <strong>Full Name:</strong> {user.fullName}
            </div>
            <div>
                <strong>Status:</strong> {user.status}
            </div>
        </div>
    );
};

export default UserDetail;
