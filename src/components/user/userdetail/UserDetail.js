// src/components/UserDetail/UserDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../firebase";
import {v4} from "uuid";


const UserDetail = () => {
    const [img, setImg] = useState(null);
    const [imgList, setImgList] = useState([])
    const imgRef = ref(storage, "images/");
    const uploadImage = () => {
        if (img == null) return;
        const imgRef = ref(storage, 'images/' + img.name + v4());
        uploadBytes(imgRef, img).then(() => {
            alert('Image uploaded')
        })
    };
    useEffect(() => {
        listAll(imgRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImgList((prev) => [...prev, url])
                })
            })
        })
    });

    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost8080/api/users/${id}`);
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
            <input type={"file"}/>
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
