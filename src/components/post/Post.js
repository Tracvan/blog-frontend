import React, { useState, useEffect } from 'react';
import './Post.css';
import axios from 'axios';

function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get('http://localhost:8080/api/users/posts',config);
            setPosts(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <a key={post.id} href="#"
                   className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img
                        className="object-cover w-9 rounded-t-lg h-50 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                        src={post.image}
                        alt=""/>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {post.title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {post.content}
                        </p>
                        <div style={{display: "flex"}}>
                        <img
                            className="object-cover w-100 rounded-s-2xl h-2 md:h-auto md:w-8 md:rounded-2xl md:rounded-2xl"
                            src={post.userAvatar}
                            alt=""/>
                        <span>{post.username}</span> <span>{post.time}</span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}

export default Post;